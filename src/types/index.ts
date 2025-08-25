export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'student';
  studentId?: string;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  credits: number;
  semester: string;
  year: number;
  maxStudents: number;
  enrolledStudents: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'completed';
  createdAt: string;
}

export interface Registration {
  id: string;
  studentId: string;
  courseId: string;
  registrationDate: string;
  status: 'registered' | 'completed' | 'dropped';
}

export interface Result {
  id: string;
  studentId: string;
  courseId: string;
  grade: string;
  score: number;
  feedback?: string;
  assignedBy: string;
  assignedAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export interface CourseContextType {
  courses: Course[];
  addCourse: (course: Omit<Course, 'id' | 'createdAt'>) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  loading: boolean;
}