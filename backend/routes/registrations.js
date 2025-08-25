const express = require('express');
const Registration = require('../models/Registration');
const Course = require('../models/Course');
const { auth, studentAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/registrations/my-courses
// @desc    Get current student's registered courses
// @access  Student only
router.get('/my-courses', studentAuth, async (req, res) => {
  try {
    const registrations = await Registration.find({ 
      student: req.user._id 
    }).populate('course').sort({ registrationDate: -1 });

    res.json(registrations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/registrations/register/:courseId
// @desc    Register for a course
// @access  Student only
router.post('/register/:courseId', studentAuth, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const studentId = req.user._id;

    // Check if course exists and is active
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.status !== 'active') {
      return res.status(400).json({ message: 'Course is not available for registration' });
    }

    // Check if course is full
    if (course.enrolledStudents >= course.maxStudents) {
      return res.status(400).json({ message: 'Course is full' });
    }

    // Check if student is already registered
    const existingRegistration = await Registration.findOne({
      student: studentId,
      course: courseId
    });

    if (existingRegistration) {
      return res.status(400).json({ message: 'You are already registered for this course' });
    }

    // Create registration
    const registration = new Registration({
      student: studentId,
      course: courseId
    });

    await registration.save();

    // Update course enrollment count
    await Course.findByIdAndUpdate(courseId, {
      $inc: { enrolledStudents: 1 }
    });

    const populatedRegistration = await Registration.findById(registration._id)
      .populate('course');

    res.status(201).json({
      message: 'Successfully registered for course',
      registration: populatedRegistration
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/registrations/:courseId
// @desc    Drop a course
// @access  Student only
router.delete('/:courseId', studentAuth, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const studentId = req.user._id;

    const registration = await Registration.findOne({
      student: studentId,
      course: courseId
    });

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    // Update registration status to dropped
    registration.status = 'dropped';
    await registration.save();

    // Update course enrollment count
    await Course.findByIdAndUpdate(courseId, {
      $inc: { enrolledStudents: -1 }
    });

    res.json({ message: 'Successfully dropped course' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/registrations/course/:courseId
// @desc    Get all registrations for a specific course
// @access  Admin only
router.get('/course/:courseId', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const registrations = await Registration.find({ 
      course: req.params.courseId 
    }).populate('student', 'firstName lastName email studentId')
      .sort({ registrationDate: -1 });

    res.json(registrations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;