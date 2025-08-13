import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  suffix?: string;
}

export const StatsCard = ({ title, value, icon: Icon, color, suffix = '' }: StatsCardProps) => {
  return (
    <div className="bg-gradient-card rounded-xl p-6 shadow-card border hover:shadow-elevated transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold">
            {value}{suffix}
          </p>
        </div>
        <div 
          className={cn(
            "p-3 rounded-lg",
            color === 'education-primary' && "bg-education-primary/10 text-education-primary",
            color === 'progress-completed' && "bg-progress-completed/10 text-progress-completed",
            color === 'progress-in-progress' && "bg-progress-in-progress/10 text-progress-in-progress",
            color === 'education-secondary' && "bg-education-secondary/10 text-education-secondary"
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};