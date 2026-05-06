export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type Category = 'work' | 'personal' | 'health' | 'learning' | 'other';

export interface Task {
  id: string;
  title: string;
  description?: string;
  due: string; // ISO datetime string
  importance: number; // 1–10
  urgency: number;    // 1–10
  effortHours: number;
  priorityScore?: number;
  priority?: Priority;
  status: TaskStatus;
  category: Category;
  tags?: string[];
  createdAt: string;
}

export interface Insight {
  id: string;
  type: 'tip' | 'warning' | 'success';
  message: string;
}

export type FilterStatus = 'all' | TaskStatus;
export type SortField = 'priorityScore' | 'due' | 'createdAt' | 'title';
