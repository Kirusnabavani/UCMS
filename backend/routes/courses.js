const express = require('express');
const { body, validationResult } = require('express-validator');
const Course = require('../models/Course');
const Registration = require('../models/Registration');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/courses
// @desc    Get all courses
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { status, semester, year, search } = req.query;
    let query = {};

    // Add filters
    if (status) query.status = status;
    if (semester) query.semester = semester;
    if (year) query.year = parseInt(year);
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { instructor: { $regex: search, $options: 'i' } }
      ];
    }

    const courses = await Course.find(query).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/courses/:id
// @desc    Get course by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/courses
// @desc    Create a new course
// @access  Admin only
router.post('/', [adminAuth, [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('instructor').trim().notEmpty().withMessage('Instructor is required'),
  body('credits').isInt({ min: 1, max: 5 }).withMessage('Credits must be between 1 and 5'),
  body('semester').isIn(['Spring', 'Summer', 'Fall', 'Winter']).withMessage('Invalid semester'),
  body('year').isInt({ min: new Date().getFullYear() }).withMessage('Invalid year'),
  body('maxStudents').isInt({ min: 1 }).withMessage('Max students must be at least 1'),
  body('startDate').isISO8601().withMessage('Invalid start date'),
  body('endDate').isISO8601().withMessage('Invalid end date')
]], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const course = new Course(req.body);
    await course.save();

    res.status(201).json({
      message: 'Course created successfully',
      course
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/courses/:id
// @desc    Update a course
// @access  Admin only
router.put('/:id', [adminAuth, [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('instructor').optional().trim().notEmpty().withMessage('Instructor cannot be empty'),
  body('credits').optional().isInt({ min: 1, max: 5 }).withMessage('Credits must be between 1 and 5'),
  body('semester').optional().isIn(['Spring', 'Summer', 'Fall', 'Winter']).withMessage('Invalid semester'),
  body('year').optional().isInt({ min: new Date().getFullYear() }).withMessage('Invalid year'),
  body('maxStudents').optional().isInt({ min: 1 }).withMessage('Max students must be at least 1'),
  body('startDate').optional().isISO8601().withMessage('Invalid start date'),
  body('endDate').optional().isISO8601().withMessage('Invalid end date'),
  body('status').optional().isIn(['active', 'inactive', 'completed']).withMessage('Invalid status')
]], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({
      message: 'Course updated successfully',
      course
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/courses/:id
// @desc    Delete a course
// @access  Admin only
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if there are any registrations for this course
    const registrations = await Registration.countDocuments({ course: req.params.id });
    if (registrations > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete course with existing registrations. Please remove all registrations first.' 
      });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;