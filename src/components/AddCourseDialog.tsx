import { useState } from 'react';
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

interface AddCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => void;
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

export const AddCourseDialog = ({ open, onOpenChange, onSubmit }: AddCourseDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    status: 'not-started' as CourseStatus,
    totalLessons: 1,
    estimatedHours: 1,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      ...formData,
      progress: 0,
      completedLessons: 0,
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      status: 'not-started',
      totalLessons: 1,
      estimatedHours: 1,
      notes: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-card border max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Curso</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título do Curso</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Ex: Curso de React.js"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Breve descrição do curso..."
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
                  <SelectValue placeholder="Selecione..." />
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
              <Label htmlFor="status">Status Inicial</Label>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Anotações (opcional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Suas anotações sobre o curso..."
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
              disabled={!formData.title.trim()}
            >
              Adicionar Curso
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};