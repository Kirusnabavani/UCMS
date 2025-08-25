import React, { useState } from 'react';
import { useCourses } from '../../contexts/CourseContext';
import { Plus, Search, Edit2, Trash2, Users, Calendar, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

export default function CourseManagement() {
  const { courses, deleteCourse } = useCourses();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'completed'>('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDeleteCourse = (courseId: string, courseName: string) => {
    if (window.confirm(`Are you sure you want to delete "${courseName}"? This action cannot be undone.`)) {
      deleteCourse(courseId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600 mt-2">Manage all university courses and their details.</p>
        </div>
        <Link
          to="/courses/new"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Course</span>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses by title or instructor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            {['all', 'active', 'inactive', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status as any)}
                className={clsx(
                  'px-4 py-2 rounded-lg font-medium transition-all duration-200 capitalize',
                  filterStatus === status
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-white/80 text-gray-700 hover:bg-blue-50 border border-gray-300'
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Courses</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{courses.length}</p>
            </div>
            <div className="bg-blue-500 p-4 rounded-xl">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Courses</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {courses.filter(c => c.status === 'active').length}
              </p>
            </div>
            <div className="bg-green-500 p-4 rounded-xl">
              <Calendar className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Enrollments</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {courses.reduce((sum, course) => sum + course.enrolledStudents, 0)}
              </p>
            </div>
            <div className="bg-purple-500 p-4 rounded-xl">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg. Enrollment</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {courses.length > 0 ? Math.round(courses.reduce((sum, course) => sum + course.enrolledStudents, 0) / courses.length) : 0}
              </p>
            </div>
            <div className="bg-amber-500 p-4 rounded-xl">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Course</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Instructor</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Enrollment</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Credits</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-blue-50/30 transition-colors duration-200">
                  <td className="py-4 px-6">
                    <div>
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{course.semester} {course.year}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-gray-900">{course.instructor}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-900">{course.enrolledStudents}/{course.maxStudents}</span>
                          <span className="text-gray-600">
                            {Math.round((course.enrolledStudents / course.maxStudents) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${(course.enrolledStudents / course.maxStudents) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900 font-medium">{course.credits}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={clsx(
                      'px-3 py-1 rounded-full text-xs font-medium',
                      course.status === 'active' && 'bg-green-100 text-green-800',
                      course.status === 'inactive' && 'bg-gray-100 text-gray-800',
                      course.status === 'completed' && 'bg-blue-100 text-blue-800'
                    )}>
                      {course.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/courses/${course.id}/edit`}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                        title="Edit Course"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteCourse(course.id, course.title)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                        title="Delete Course"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search terms or filters.' 
                : 'Get started by adding your first course.'}
            </p>
            {(!searchTerm && filterStatus === 'all') && (
              <Link
                to="/courses/new"
                className="inline-flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors duration-200"
              >
                <Plus className="h-5 w-5" />
                <span>Add New Course</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}