const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  location: {
    type: String,
    required: true,
  },
  postDate: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ['fulltime', 'parttime', 'internship'],
    required: true,
  },
  applicants: {
    type: [String], // email IDs of students who applied
    default: [],
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
