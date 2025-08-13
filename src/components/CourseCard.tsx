import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MoreHorizontal, Edit, Trash2, BookOpen, Clock } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Course } from '@/types/course';
import { cn } from '@/lib/utils';
import { EditCourseDialog } from './EditCourseDialog';

interface CourseCardProps {
  course: Course;
  onUpdate: (id: string, updates: Partial<Course>) => void;
  onDelete: (id: string) => void;
}

const statusConfig = {
  'not-started': {
    label: 'Não Iniciado',
    color: 'bg-progress-not-started/10 text-progress-not-started border-progress-not-started/20',
  },
  'in-progress': {
    label: 'Em Progresso',
    color: 'bg-progress-in-progress/10 text-progress-in-progress border-progress-in-progress/20',
  },
  'completed': {
    label: 'Concluído',
    color: 'bg-progress-completed/10 text-progress-completed border-progress-completed/20',
  },
};

export const CourseCard = ({ course, onUpdate, onDelete }: CourseCardProps) => {
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleProgressUpdate = (increment: boolean) => {
    const newCompletedLessons = increment 
      ? Math.min(course.completedLessons + 1, course.totalLessons)
      : Math.max(course.completedLessons - 1, 0);
    
    const pct = (newCompletedLessons / course.totalLessons) * 100;
    const newStatus = course["status"] = pct === 100 ? 'completed' : pct > 0 ? 'in-progress' : 'not-started';

    onUpdate(course.id, {
      completedLessons: newCompletedLessons,
      status: newStatus,
    });
  };

  return (
    <>
      <Card className="bg-gradient-card border shadow-card hover:shadow-elevated transition-all duration-300 group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
              <Badge className={cn("text-xs", statusConfig[course.status].color)}>
                {statusConfig[course.status].label}
              </Badge>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(course.id)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{course.completedLessons}/{course.totalLessons} aulas</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{course.estimatedHours}h</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso</span>
              <span>{Math.round(course.progress)}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        </CardContent>

        <CardFooter className="pt-3">
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleProgressUpdate(false)}
              disabled={course.completedLessons === 0}
              className="flex-1"
            >
              -1 Aula
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleProgressUpdate(true)}
              disabled={course.completedLessons === course.totalLessons}
              className="flex-1"
            >
              +1 Aula
            </Button>
          </div>
        </CardFooter>
      </Card>

      <EditCourseDialog
        course={course}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSubmit={(updates) => {
          onUpdate(course.id, updates);
          setShowEditDialog(false);
        }}
      />
    </>
  );
};