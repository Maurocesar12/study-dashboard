import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCourses } from '@/hooks/useCourses';

export default function CoursePage() {
  const { id } = useParams();
  const { courses } = useCourses();
  const course = courses.find(c => c.id === id);

  if (!course) {
    return (
      <div className="container py-6 space-y-4">
        <p>Curso não encontrado.</p>
        <Button asChild><Link to="/">Voltar</Link></Button>
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] animate-gradient-x">
            {course.title}
          </h1>
          <p className="text-muted-foreground mt-2">{course.description}</p>
        </div>
        <Button asChild variant="outline"><Link to="/">Voltar</Link></Button>
      </div>
    </div>
  );
}
