import { useState, useEffect } from 'react';
import { Course, CourseStats } from '@/types/course';

const STORAGE_KEY = 'study-dashboard-courses';

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  // Load courses from localStorage on mount
  useEffect(() => {
    try{
    const saved = localStorage.getItem(STORAGE_KEY);
    if(saved) setCourses(JSON.parse(saved));
  }catch (e){
    console.error("Error loading courses from localStorage:", e);
  };
  }, []);

  // Save courses to localStorage whenever courses change
  useEffect(() => {
    try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
    }catch (e){
      console.error("Error saving courses to localStorage:", e);
    }
  }, [courses]);

  const addCourse = (courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCourse: Course = {
      ...courseData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCourses(prev => [...prev, newCourse]);
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    setCourses(prev => 
      prev.map(course => 
        course.id === id 
          ? { ...course, ...updates, updatedAt: new Date().toISOString() }
          : course
      )
    );
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };

  const getStats = (): CourseStats => {
    const totalCourses = courses.length;
    const completedCourses = courses.filter(c => c.status === 'completed').length;
    const inProgressCourses = courses.filter(c => c.status === 'in-progress').length;
    const totalHours = courses.reduce((sum, course) => sum + course.estimatedHours, 0);
    const completedHours = courses
      .filter(c => c.status === 'completed')
      .reduce((sum, course) => sum + course.estimatedHours, 0);

    return {
      totalCourses,
      completedCourses,
      inProgressCourses,
      totalHours,
      completedHours,
    };
  };

  return {
    courses,
    addCourse,
    updateCourse,
    deleteCourse,
    getStats,
  };
};