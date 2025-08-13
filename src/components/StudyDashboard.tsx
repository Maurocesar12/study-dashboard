import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen, Trophy, Clock, TrendingUp } from 'lucide-react';
import { useCourses } from '@/hooks/useCourses';
import { CourseCard } from './CourseCard';
import { StatsCard } from './StatsCard';
import { AddCourseDialog } from './AddCourseDialog';

export const StudyDashboard = () => {
  const { courses, addCourse, updateCourse, deleteCourse, getStats } = useCourses();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const stats = getStats();

  const overallProgress = stats.totalCourses > 0 
    ? (stats.completedCourses / stats.totalCourses) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Dashboard de Estudos
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Acompanhe seu progresso de aprendizado, gerencie cursos e alcance seus objetivos educacionais.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total de Cursos"
            value={stats.totalCourses}
            icon={BookOpen}
            color="education-primary"
          />
          <StatsCard
            title="Concluídos"
            value={stats.completedCourses}
            icon={Trophy}
            color="progress-completed"
          />
          <StatsCard
            title="Em Progresso"
            value={stats.inProgressCourses}
            icon={TrendingUp}
            color="progress-in-progress"
          />
          <StatsCard
            title="Horas Estudadas"
            value={stats.completedHours}
            icon={Clock}
            color="education-secondary"
            suffix="h"
          />
        </div>

        {/* Progress Overview */}
        {stats.totalCourses > 0 && (
          <div className="bg-gradient-card rounded-xl p-6 shadow-card border">
            <h3 className="text-xl font-semibold mb-4">Progresso Geral</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso dos Cursos</span>
                <span>{Math.round(overallProgress)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                role="progressbar"
                aria-valuenow={Math.round(overallProgress)}
                aria-valuemin={0}
                aria-valuemax={100}
                  className="bg-gradient-primary h-3 rounded-full"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Bar */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Meus Cursos</h2>
          <Button 
            onClick={() => setShowAddDialog(true)}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Curso
          </Button>
        </div>

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <div className="text-center py-12 bg-gradient-card rounded-xl border">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nenhum curso cadastrado</h3>
            <p className="text-muted-foreground mb-6">
              Comece sua jornada de aprendizado adicionando seu primeiro curso!
            </p>
            <Button 
              onClick={() => setShowAddDialog(true)}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Primeiro Curso
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onUpdate={updateCourse}
                onDelete={deleteCourse}
              />
            ))}
          </div>
        )}

        {/* Add Course Dialog */}
        <AddCourseDialog
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
          onSubmit={(courseData) => {
            addCourse(courseData);
            setShowAddDialog(false);
          }}
        />
      </div>
    </div>
  );
};