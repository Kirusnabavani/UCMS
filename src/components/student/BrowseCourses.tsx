import React, { useState } from 'react';
import { useCourses } from '../../contexts/CourseContext';
import { Search, Filter, BookOpen, Users, Calendar, Clock, CheckCircle } from 'lucide-react';
import clsx from 'clsx';

export default function BrowseCourses() {
  const { courses } = useCourses();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedCredits, setSelectedCredits] = useState('all');
  const [registeredCourses, setRegisteredCourses] = useState<string[]>(['1', '2']); // Mock registered courses

  const availableCourses = courses.filter(course => course.status === 'active');
  
  const filteredCourses = availableCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester = selectedSemester === 'all' || course.semester === selectedSemester;
    const matchesCredits = selectedCredits === 'all' || course.credits.toString() === selectedCredits;
    return matchesSearch && matchesSemester && matchesCredits;
  });

  const handleRegister = (courseId: string) => {
    if (registeredCourses.includes(courseId)) return;
    
    setRegisteredCourses(prev => [...prev, courseId]);
    // In real app, this would make an API call
  };

  const semesters = [...new Set(courses.map(course => course.semester))];
  const credits = [...new Set(courses.map(course => course.credits))].sort();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Browse Courses</h1>
        <p className="text-gray-600 mt-2">Discover and register for available courses this semester.</p>
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
          <div className="flex gap-2">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
            >
              <option value="all">All Semesters</option>
              {semesters.map(semester => (
                <option key={semester} value={semester}>{semester}</option>
              ))}
            </select>
            <select
              value={selectedCredits}
              onChange={(e) => setSelectedCredits(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
            >
              <option value="all">All Credits</option>
              {credits.map(credit => (
                <option key={credit} value={credit}>{credit} Credits</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isRegistered = registeredCourses.includes(course.id);
          const isFull = course.enrolledStudents >= course.maxStudents;
          
          return (
            <div key={course.id} className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden">
              {/* Course Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-500 p-2 rounded-lg">
                      <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 line-clamp-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{course.semester} {course.year}</p>
                    </div>
                  </div>
                  {isRegistered && (
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <p className="text-gray-700 text-sm line-clamp-3">{course.description}</p>
              </div>

              {/* Course Details */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Instructor</span>
                  </div>
                  <span className="font-medium text-gray-900">{course.instructor}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Credits</span>
                  </div>
                  <span className="font-medium text-gray-900">{course.credits}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>Enrollment</span>
                    </div>
                    <span className="font-medium text-gray-900">
                      {course.enrolledStudents}/{course.maxStudents}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={clsx(
                        'h-2 rounded-full transition-all duration-300',
                        isFull ? 'bg-red-500' : 'bg-blue-500'
                      )}
                      style={{ width: `${Math.min((course.enrolledStudents / course.maxStudents) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleRegister(course.id)}
                    disabled={isRegistered || isFull}
                    className={clsx(
                      'w-full py-3 px-4 rounded-xl font-medium transition-all duration-200',
                      isRegistered
                        ? 'bg-green-100 text-green-700 cursor-not-allowed'
                        : isFull
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                    )}
                  >
                    {isRegistered ? 'Registered' : isFull ? 'Course Full' : 'Register'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters to find courses.
          </p>
        </div>
      )}
    </div>
  );
}