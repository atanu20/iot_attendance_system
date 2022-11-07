const subjectInSemTable = require('../models/subjectInSemSchema');
const adminCtrl = {
  addSubjectForSem: async (req, res) => {
    try {
      const { semester, subject, dept, batch } = req.body;

      const data_exist = await subjectInSemTable.findOne({
        semester,
        dept,
        batch,
      });
      //   console.log(data_exist);
      if (data_exist) {
        const dat = await subjectInSemTable.findOneAndUpdate(
          { _id: data_exist._id },
          {
            subjects: [...data_exist.subjects, subject],
          },
          { new: true }
        );
      } else {
        const newdata = new subjectInSemTable({
          semester,
          subjects: [subject],
          dept,
          batch,
        });
        await newdata.save();
      }
      return res.json({ success: true, msg: 'Upload Done Successfully' });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
};

module.exports = adminCtrl;
