import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Course, CourseContextType } from '../types';
import { v4 as uuidv4 } from 'uuid';

const CourseContext = createContext<CourseContextType | undefined>(undefined);

// Mock courses for demonstration
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Computer Science',
    description: 'Fundamental concepts of computer science including programming, algorithms, and data structures.',
    instructor: 'Dr. Sarah Johnson',
    credits: 3,
    semester: 'Spring',
    year: 2024,
    maxStudents: 30,
    enrolledStudents: 25,
    startDate: '2024-01-15',
    endDate: '2024-05-15',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Advanced Mathematics',
    description: 'Advanced mathematical concepts including calculus, linear algebra, and statistical analysis.',
    instructor: 'Prof. Michael Chen',
    credits: 4,
    semester: 'Spring',
    year: 2024,
    maxStudents: 25,
    enrolledStudents: 22,
    startDate: '2024-01-15',
    endDate: '2024-05-15',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    title: 'Web Development Fundamentals',
    description: 'Learn HTML, CSS, JavaScript, and modern web development frameworks.',
    instructor: 'Dr. Emily Rodriguez',
    credits: 3,
    semester: 'Spring',
    year: 2024,
    maxStudents: 35,
    enrolledStudents: 32,
    startDate: '2024-01-15',
    endDate: '2024-05-15',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export function CourseProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [loading, setLoading] = useState(false);

  const addCourse = (courseData: Omit<Course, 'id' | 'createdAt'>) => {
    const newCourse: Course = {
      ...courseData,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    setCourses(prev => [...prev, newCourse]);
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    setCourses(prev => prev.map(course => 
      course.id === id ? { ...course, ...updates } : course
    ));
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };

  return (
    <CourseContext.Provider value={{ courses, addCourse, updateCourse, deleteCourse, loading }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
}