export type CourseStatus = 'not-started' | 'in-progress' | 'completed';

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  status: CourseStatus;
  progress: number; // 0-100
  totalLessons: number;
  completedLessons: number;
  estimatedHours: number;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface CourseStats {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalHours: number;
  completedHours: number;
}