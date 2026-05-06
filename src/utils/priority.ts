import type { Task, Priority } from '../types';

/**
 * Deterministic priority score based on urgency, importance, and effort.
 * Formula: (0.6 × urgency + 0.4 × importance) / effortHours
 * Higher score = higher priority.
 */
export function calculatePriorityScore(task: {
  urgency: number;
  importance: number;
  effortHours: number;
}): number {
  const { urgency, importance, effortHours } = task;
  const score = (0.6 * urgency + 0.4 * importance) / Math.max(0.5, effortHours);
  return Math.round(score * 10) / 10;
}

export function getPriorityLevel(score: number): Priority {
  if (score >= 8) return 'critical';
  if (score >= 5) return 'high';
  if (score >= 3) return 'medium';
  return 'low';
}

export function getPriorityColor(priority: Priority): string {
  switch (priority) {
    case 'critical': return 'text-red-600 bg-red-50 border-red-200';
    case 'high':     return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'medium':   return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'low':      return 'text-green-600 bg-green-50 border-green-200';
  }
}

export function getPriorityDot(priority: Priority): string {
  switch (priority) {
    case 'critical': return 'bg-red-500';
    case 'high':     return 'bg-orange-500';
    case 'medium':   return 'bg-amber-400';
    case 'low':      return 'bg-green-500';
  }
}

export function enrichTask(task: Omit<Task, 'priorityScore' | 'priority'>): Task {
  const score = calculatePriorityScore(task);
  return {
    ...task,
    priorityScore: score,
    priority: getPriorityLevel(score),
  };
}

export function sortTasksByPriority(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => (b.priorityScore ?? 0) - (a.priorityScore ?? 0));
}

export function getDaysUntilDue(due: string): number {
  const now = new Date();
  const dueDate = new Date(due);
  const diff = dueDate.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function isOverdue(due: string): boolean {
  return getDaysUntilDue(due) < 0;
}

export function formatDueDate(due: string): string {
  const days = getDaysUntilDue(due);
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return 'Due today';
  if (days === 1) return 'Due tomorrow';
  if (days <= 7) return `Due in ${days}d`;
  return new Date(due).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
