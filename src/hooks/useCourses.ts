import { useState, useEffect } from 'react';
import { Course, CourseStats, studyLog } from '@/types/course';
import { useMemo } from 'react';

const STORAGE_KEY = 'study-dashboard-courses';

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  // Load courses from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCourses(JSON.parse(saved));
    } catch (e) {
      console.error("Error loading courses from localStorage:", e);
    }
  }, []);

  // Save courses to localStorage whenever courses change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
    } catch (e) {
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const getFiltered = (params: { search: string; status: string; category: string; orderBy: string; }) => {
    const { search, status, category, orderBy } = params;
    return [...courses]
      .filter(c => {
        const matchesSearch =
          !search ||
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          (c.description ?? '').toLowerCase().includes(search.toLowerCase());

        const matchesStatus = status === 'all' || c.status === status;
        const matchesCategory = category === 'all' || c.category === category;

        return matchesSearch && matchesStatus && matchesCategory;
      })
      .sort((a, b) => {
        switch (orderBy) {
          case 'updatedAt_desc': return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
          case 'createdAt_desc': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'progress_desc': return (b.progress ?? 0) - (a.progress ?? 0);
          case 'title_asc': return a.title.localeCompare(b.title);
          default: return 0;
        }
      });
  };

  const memoizedStats = useMemo(() => getStats(), [getStats]);

  // Helpers de logs
  const addStudyLog = (courseId: string, log: Omit<studyLog, 'id' | 'date'> & { date?: string }) => {
  setCourses(prev => prev.map(c => {
    if (c.id !== courseId) return c;
    const list = c.studyLogs ?? [];
    const newLog: studyLog = {
      id: crypto.randomUUID(),
      date: log.date ?? new Date().toISOString(),
      minutes: Math.max(1, Math.floor(log.minutes || 1)),
      note: log.note?.trim() || undefined,
    };
    return {
      ...c,
      studyLogs: [newLog, ...list],
      updatedAt: new Date().toISOString(),
    };
  }));
};

const updateStudyLog = (courseId: string, logId: string, patch: Partial<studyLog>) => {
  setCourses(prev => prev.map(c => {
    if (c.id !== courseId) return c;
    const list = (c.studyLogs ?? []).map((l: studyLog) => (l && l.id === logId) ? { ...l, ...patch } : l);
    return { ...c, studyLogs: list, updatedAt: new Date().toISOString() };
  }));
};

const deleteStudyLog = (courseId: string, logId: string) => {
  setCourses(prev => prev.map(c => {
    if (c.id !== courseId) return c;
    const list = (c.studyLogs ?? []).filter((l: studyLog) => l.id !== logId);
    return { ...c, studyLogs: list, updatedAt: new Date().toISOString() };
  }));
};


  return {
    courses,
    addCourse,
    updateCourse,
    deleteCourse,
    getStats: () => memoizedStats,
    getFiltered,
    addStudyLog,
    updateStudyLog,
    deleteStudyLog,
    
  };
};