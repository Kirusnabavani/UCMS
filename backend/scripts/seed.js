const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Course = require('../models/Course');
const Registration = require('../models/Registration');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/university-cms');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Registration.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    const admin = new User({
      firstName: 'John',
      lastName: 'Administrator',
      email: 'admin@university.edu',
      password: adminPassword,
      role: 'admin'
    });
    await admin.save();

    // Create sample students
    const studentPassword = await bcrypt.hash('student123', 12);
    const students = [];
    
    for (let i = 1; i <= 5; i++) {
      const student = new User({
        firstName: `Student${i}`,
        lastName: `Test`,
        email: `student${i}@university.edu`,
        password: studentPassword,
        role: 'student',
        studentId: `STU00${i}`
      });
      students.push(student);
    }
    
    await User.insertMany(students);

    // Create sample courses
    const courses = [
      {
        title: 'Introduction to Computer Science',
        description: 'Fundamental concepts of computer science including programming, algorithms, and data structures.',
        instructor: 'Dr. Sarah Johnson',
        credits: 3,
        semester: 'Spring',
        year: 2024,
        maxStudents: 30,
        enrolledStudents: 0,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-05-15'),
        status: 'active'
      },
      {
        title: 'Advanced Mathematics',
        description: 'Advanced mathematical concepts including calculus, linear algebra, and statistical analysis.',
        instructor: 'Prof. Michael Chen',
        credits: 4,
        semester: 'Spring',
        year: 2024,
        maxStudents: 25,
        enrolledStudents: 0,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-05-15'),
        status: 'active'
      },
      {
        title: 'Web Development Fundamentals',
        description: 'Learn HTML, CSS, JavaScript, and modern web development frameworks.',
        instructor: 'Dr. Emily Rodriguez',
        credits: 3,
        semester: 'Spring',
        year: 2024,
        maxStudents: 35,
        enrolledStudents: 0,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-05-15'),
        status: 'active'
      },
      {
        title: 'Database Management Systems',
        description: 'Comprehensive study of database design, implementation, and management.',
        instructor: 'Dr. Robert Kim',
        credits: 4,
        semester: 'Fall',
        year: 2024,
        maxStudents: 28,
        enrolledStudents: 0,
        startDate: new Date('2024-08-15'),
        endDate: new Date('2024-12-15'),
        status: 'inactive'
      }
    ];

    const createdCourses = await Course.insertMany(courses);

    // Create sample registrations
    const registrations = [
      {
        student: students[0]._id,
        course: createdCourses[0]._id,
        status: 'registered'
      },
      {
        student: students[0]._id,
        course: createdCourses[1]._id,
        status: 'registered'
      },
      {
        student: students[1]._id,
        course: createdCourses[0]._id,
        status: 'registered'
      },
      {
        student: students[1]._id,
        course: createdCourses[2]._id,
        status: 'registered'
      }
    ];

    await Registration.insertMany(registrations);

    // Update enrolled student counts
    await Course.findByIdAndUpdate(createdCourses[0]._id, { enrolledStudents: 2 });
    await Course.findByIdAndUpdate(createdCourses[1]._id, { enrolledStudents: 1 });
    await Course.findByIdAndUpdate(createdCourses[2]._id, { enrolledStudents: 1 });

    console.log('Database seeded successfully!');
    console.log('Admin credentials: admin@university.edu / admin123');
    console.log('Student credentials: student1@university.edu / student123');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();