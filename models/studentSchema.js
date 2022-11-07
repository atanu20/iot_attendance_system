const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,

    trim: true,
  },
  profileimg: {
    type: String,

    trim: true,
  },
  studentId: {
    type: String,
    required: true,
    trim: true,
  },
  batch: {
    type: String,

    trim: true,
  },
  dept: {
    type: String,

    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const studentDetTable = new mongoose.model('studentDet', studentSchema);
module.exports = studentDetTable;
