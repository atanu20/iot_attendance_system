const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true,
  },
  studentId: {
    type: String,
    required: true,
    trim: true,
  },
  studentDept: {
    type: String,
    required: true,
    trim: true,
  },
  studentBatch: {
    type: String,
    required: true,
    trim: true,
  },
  subjectCode: {
    type: String,
    // required: true,
    default: '',
    trim: true,
  },
  currentSem: {
    type: String,
    required: true,
    trim: true,
  },
  presentDate: {
    type: Date,
    default: Date.now,
  },
});

const attendanceTable = new mongoose.model('attendance', attendanceSchema);

module.exports = attendanceTable;
