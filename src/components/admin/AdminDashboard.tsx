import React from 'react';
import { useCourses } from '../../contexts/CourseContext';
import { BookOpen, Users, TrendingUp, Award, Plus, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { courses } = useCourses();

  const totalStudents = 150; // Mock data
  const totalEnrollments = courses.reduce((sum, course) => sum + course.enrolledStudents, 0);
  const averageEnrollment = courses.length > 0 ? Math.round(totalEnrollments / courses.length) : 0;

  const stats = [
    {
      title: 'Total Courses',
      value: courses.length,
      icon: BookOpen,
      color: 'bg-blue-500',
      change: '+2 this month'
    },
    {
      title: 'Total Students',
      value: totalStudents,
      icon: Users,
      color: 'bg-green-500',
      change: '+15 this month'
    },
    {
      title: 'Total Enrollments',
      value: totalEnrollments,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+28 this month'
    },
    {
      title: 'Avg. Enrollment',
      value: averageEnrollment,
      icon: Award,
      color: 'bg-amber-500',
      change: '+3 this month'
    }
  ];

  const recentCourses = courses.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening in your university.</p>
        </div>
        <Link
          to="/courses/new"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Course</span>
        </Link>
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
                  <p className="text-green-600 text-sm mt-2 font-medium">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-xl`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Courses */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Recent Courses</h2>
            <Link 
              to="/courses" 
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <Eye className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {recentCourses.map((course) => (
            <div key={course.id} className="p-6 hover:bg-blue-50/50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{course.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">Instructor: {course.instructor}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>{course.credits} Credits</span>
                    <span>•</span>
                    <span>{course.enrolledStudents}/{course.maxStudents} Enrolled</span>
                    <span>•</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.status === 'active' ? 'bg-green-100 text-green-800' :
                      course.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {course.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(course.enrolledStudents / course.maxStudents) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 min-w-max">
                    {Math.round((course.enrolledStudents / course.maxStudents) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}