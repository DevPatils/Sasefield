const express = require('express');
const JobsRouter = express.Router();
const Job = require('../models/jobs.model');
const protect = require('../Middleware/authenticate');
const adminOnly = require('../Middleware/authenticate');

// Create Job Route (Admin only)
JobsRouter.post('/post', protect, adminOnly, async (req, res) => {
  const { jobTitle, companyName, jobDescription, tags, location, type } = req.body;

  if (!companyName) {
    return res.status(400).json({ message: 'Company name is required' });
  }

  try {
    const job = new Job({
      jobTitle,
      companyName,
      jobDescription,
      tags,
      location,
      type,
      postedBy: req.user._id,
    });

    await job.save();

    res.status(201).json({
      message: 'Job posted successfully',
      job,
    });
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



JobsRouter.get('/alljobs', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json({ jobs });
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Apply to Job Route (Authenticated users only)
// Example using Express & Mongoose
JobsRouter.post('/apply/:id', protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const userId = req.user._id;

    // Prevent duplicate applications
    if (job.applicants.includes(userId.toString())) {
      return res.status(400).json({ message: 'Already applied to this job' });
    }

    await Job.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { applicants: userId } }, // ensures no duplicate
      { new: true }
    );

    res.status(200).json({ message: 'Application submitted successfully' });
  } catch (err) {
    console.error('Error applying to job:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// JobsRouter.get('/admin/my-jobs')
JobsRouter.get('/admin/my-jobs', protect, adminOnly, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id })
      .populate('applicants', 'name email') // 👈 populate applicant details
      .sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (err) {
    console.error('Error fetching admin jobs:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = JobsRouter;
