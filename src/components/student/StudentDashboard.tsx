import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCourses } from '../../contexts/CourseContext';
import { BookOpen, Clock, Award, TrendingUp, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { courses } = useCourses();

  // Mock student data - in real app this would come from API
  const enrolledCourses = courses.slice(0, 2); // Mock enrolled courses
  const upcomingAssignments = [
    { title: 'Computer Science Assignment 1', course: 'Introduction to Computer Science', dueDate: '2024-02-15' },
    { title: 'Mathematics Problem Set 3', course: 'Advanced Mathematics', dueDate: '2024-02-18' },
  ];

  const grades = [
    { course: 'Introduction to Computer Science', grade: 'A-', score: 88 },
    { course: 'Advanced Mathematics', grade: 'B+', score: 85 },
  ];

  const stats = [
    {
      title: 'Enrolled Courses',
      value: enrolledCourses.length,
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      title: 'Pending Assignments',
      value: upcomingAssignments.length,
      icon: Clock,
      color: 'bg-amber-500'
    },
    {
      title: 'Average Grade',
      value: 'A-',
      icon: Award,
      color: 'bg-green-500'
    },
    {
      title: 'Credits Enrolled',
      value: enrolledCourses.reduce((sum, course) => sum + course.credits, 0),
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-600 mt-2">Here's your academic progress overview.</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-xl`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Enrolled Courses */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
              <Link 
                to="/my-courses" 
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{course.title}</h3>
                    <p className="text-gray-600 text-sm">{course.instructor}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-blue-600">{course.credits} Credits</span>
              </div>
            ))}
            <Link 
              to="/browse-courses"
              className="block w-full text-center py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors duration-200"
            >
              Browse More Courses
            </Link>
          </div>
        </div>

        {/* Upcoming Assignments */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Assignments</h2>
          </div>
          <div className="p-6 space-y-4">
            {upcomingAssignments.map((assignment, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-amber-500 p-2 rounded-lg">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                    <p className="text-gray-600 text-sm">{assignment.course}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-amber-600">
                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Grades */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Recent Grades</h2>
            <Link 
              to="/my-results" 
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              View All
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="grid gap-4">
            {grades.map((grade, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{grade.course}</h3>
                    <p className="text-gray-600 text-sm">Latest Assessment</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-green-600">{grade.grade}</span>
                  <p className="text-sm text-gray-600">{grade.score}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}