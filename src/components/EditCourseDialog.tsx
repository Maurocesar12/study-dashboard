import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Course, CourseStatus } from '@/types/course';

interface EditCourseDialogProps {
  course: Course;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (updates: Partial<Course>) => void;
}

const categories = [
  'Programação',
  'Design',
  'Marketing',
  'Idiomas',
  'Ciência de Dados',
  'DevOps',
  'Mobile',
  'Web Development',
  'UI/UX',
  'Outros',
];

export const EditCourseDialog = ({ course, open, onOpenChange, onSubmit }: EditCourseDialogProps) => {
  const [formData, setFormData] = useState({
    title: course.title,
    description: course.description,
    category: course.category,
    status: course.status,
    totalLessons: course.totalLessons,
    completedLessons: course.completedLessons,
    estimatedHours: course.estimatedHours,
    notes: course.notes || '',
  });

  useEffect(() => {
    setFormData({
      title: course.title,
      description: course.description,
      category: course.category,
      status: course.status,
      totalLessons: course.totalLessons,
      completedLessons: course.completedLessons,
      estimatedHours: course.estimatedHours,
      notes: course.notes || '',
    });
  }, [course]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const progress = (formData.completedLessons / formData.totalLessons) * 100;
    const newStatus: CourseStatus = progress === 100 ? 'completed' : progress > 0 ? 'in-progress' : 'not-started';

    onSubmit({
      ...formData,
      progress,
      status: newStatus,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-card border max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Curso</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título do Curso</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: CourseStatus) => setFormData(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-started">Não Iniciado</SelectItem>
                  <SelectItem value="in-progress">Em Progresso</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalLessons">Total de Aulas</Label>
              <Input
                id="totalLessons"
                type="number"
                min="1"
                value={formData.totalLessons}
                onChange={(e) => setFormData(prev => ({ ...prev, totalLessons: parseInt(e.target.value) || 1 }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="completedLessons">Aulas Concluídas</Label>
              <Input
                id="completedLessons"
                type="number"
                min="0"
                max={formData.totalLessons}
                value={formData.completedLessons}
                onChange={(e) => setFormData(prev => ({ ...prev, completedLessons: parseInt(e.target.value) || 0 }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="estimatedHours">Horas Estimadas</Label>
            <Input
              id="estimatedHours"
              type="number"
              min="1"
              value={formData.estimatedHours}
              onChange={(e) => setFormData(prev => ({ ...prev, estimatedHours: parseInt(e.target.value) || 1 }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Anotações</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};