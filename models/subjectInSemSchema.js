const mongoose = require('mongoose');

const subjectInSemSchema = new mongoose.Schema({
  dataAdded: {
    type: String,
    default: '',
  },
  semester: {
    type: String,
    required: true,
    trim: true,
  },
  subjects: {
    type: Array,
  },

  batch: {
    type: String,
    required: true,
    trim: true,
  },
  dept: {
    type: String,
    required: true,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const subjectInSemTable = new mongoose.model(
  'subjectInSem',
  subjectInSemSchema
);
module.exports = subjectInSemTable;
