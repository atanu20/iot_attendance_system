const studentDetTable = require('../models/studentSchema');
const subjectInSemTable = require('../models/subjectInSemSchema');
const attendanceTable = require('../models/attendanceSchema');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const sendEmailGrid = require('./mailSendGrid');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const { CLIENT_URL } = process.env;

const studentCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password, id } = req.body;
      // console.log(req.body);
      const user = await studentDetTable.findOne({ email });
      if (user)
        return res.json({ success: false, msg: 'This email already exists.' });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        email,
        studentId: id,
        password: passwordHash,
      };
      // console.log(name.split(' ')[0]);
      const activation_token = createActivationToken(newUser);

      const url = `${CLIENT_URL}/student/activate/${activation_token}`;
      sendEmailGrid(
        name.split(' ')[0],
        email,
        url,
        'Verify your email address',
        'actvation'
      );

      res.json({
        success: true,
        msg: 'Register Success! Please activate your email to start.',
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      // console.log(activation_token);
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );
      // console.log(user);
      const { name, email, password, studentId } = user;
      const userexist = await studentDetTable.findOne({ email });
      if (userexist)
        return res.json({ success: false, msg: 'This email already exists.' });
      const newUser = new studentDetTable({
        name,
        email,
        password,
        studentId,
      });
      await newUser.save();
      res.json({
        success: true,
        msg: 'Account has been activated!',
        newUser,
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await studentDetTable.findOne({ email });
      if (!user)
        return res.json({ success: false, msg: 'This email does not exist.' });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.json({ success: false, msg: 'Password is incorrect.' });
      const access_token = createAccessToken({
        id: user._id,
        studentId: user.studentId,
      });

      // studentId: user.studentId,
      res.json({
        success: true,
        access_token,
        userdet: user,
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  getUserInfor: async (req, res) => {
    try {
      const user = await studentDetTable
        .findById(req.user.id)
        .select('-password');
      res.json({ success: true, userInfo: user });
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  },
  updateDetails: async (req, res) => {
    try {
      const { batch, phone, dept } = req.body;
      // console.log(req.body);
      const dat = await studentDetTable.findOneAndUpdate(
        { _id: req.user.id },
        {
          batch,
          phone,
          dept,
        },
        { new: true }
      );
      res.json({ success: true, userInfo: dat });
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { npassword } = req.body;
      // console.log(req.body);
      const password = await bcrypt.hash(npassword, 12);
      const dat = await studentDetTable.findOneAndUpdate(
        { _id: req.user.id },
        {
          password,
        },
        { new: true }
      );
      res.json({ success: true, userInfo: dat });
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  },
  updateImage: async (req, res) => {
    try {
      const file = req.files.file;

      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        {
          folder: 'avatar',
          width: 150,
          height: 150,
          crop: 'fill',
        },
        async (err, result) => {
          if (err) throw err;

          removeTmp(file.tempFilePath);

          const dat = await studentDetTable.findOneAndUpdate(
            { _id: req.user.id },
            {
              profileimg: result.secure_url,
            },
            { new: true }
          );
          res.json({ success: true, userInfo: dat });
        }
      );
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  },
  getSubjectListInSem: async (req, res) => {
    try {
      const { dept, batch } = req.body;

      const data_exist = await subjectInSemTable
        .findOne({
          dept,
          batch,
        })
        .sort({ createdAt: -1 });

      if (data_exist) {
        return res.json({ success: true, subjectList: data_exist });
      }
      return res.json({
        success: false,
        msg: 'Update Your Profile (Batch and Department)',
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  uploadPresent: async (req, res) => {
    try {
      const { data0, data1, data2, data3, data4 } = req.query;
      const data_exist = await subjectInSemTable
        .findOne({
          dept: data2,
          batch: data3,
        })
        .sort({ createdAt: -1 });
      // console.log(data_exist);
      if (data_exist) {
        const newUser = new attendanceTable({
          studentName: data0,
          studentId: data1,
          studentDept: data2,
          studentBatch: data3,
          subjectCode: data4,
          currentSem: data_exist?.semester,
        });
        await newUser.save();
        return res.json({ success: true, msg: 'Attendance Recorded' });
      } else {
        return res.json({
          success: false,
          msg: 'Department and Batch is not correct',
        });
      }

      // res.send(req.query);
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  getAttendanceList: async (req, res) => {
    try {
      const sem = req.params.sem;
      // console.log(req.user.studentId);
      // const attendanceLists = await attendanceTable
      //   .find({
      //     studentId: req.user.studentId,
      //     currentSem: sem,
      //   })
      const attendanceList = await attendanceTable.aggregate([
        { $match: { currentSem: sem, studentId: req.user.studentId } },
        {
          $group: {
            _id: '$subjectCode',
            totalCount: { $count: {} },
          },
        },
      ]);

      return res.json({ success: true, attendanceList });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
};

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: '5m',
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

const removeTmp = (pat) => {
  fs.unlink(pat, (err) => {
    if (err) throw err;
  });
};

module.exports = studentCtrl;
