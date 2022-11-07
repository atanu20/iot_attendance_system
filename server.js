require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const auth = require('./middleware/auth');
const cheerio = require('cheerio');
const request = require('request');

const studentDetTable = require('./models/studentSchema');

const sendEmailGrid = require('./controllers/mailSendGrid');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Routes
app.use('/api/student', require('./routes/studentRouter'));
app.use('/api/admin', require('./routes/adminRouter'));

app.get('/', (req, res) => {
  res.send('welcome to TMSL');
});

app.get('/api', async (req, res) => {
  // const { data0 } = req.query;
  // console.log(data0);
  // const newUser = new usertable({
  //   name: data0,
  // });
  // await newUser.save();
  // res.send(req.query);
});

app.get('/auth/isVerify', auth, async (req, res) => {
  try {
    const user = req.user;
    // console.log(user.id);
    const mydata = await studentDetTable.findById(user.id).select('-password');

    if (mydata) {
      res.send({ success: true, msg: 'done', userInfo: mydata });
    } else {
      // const mydata = await employeeTable.findById(user.id).select('-password');
      // if (mydata) {
      //   res.send({ success: true, msg: 'done', userInfo: mydata });
      // } else {
      //   res.send({ success: false, msg: 'something wrong', userInfo: [] });
      // }
    }
  } catch (err) {
    res.send({ success: false, msg: 'Something wrong' });
  }
});

// Connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('Connected to mongodb');
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
