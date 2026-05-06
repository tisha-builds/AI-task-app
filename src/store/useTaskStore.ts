import { create } from 'zustand';
import type { Task, FilterStatus, SortField } from '../types';
import { enrichTask, sortTasksByPriority } from '../utils/priority';
import { mockTasks } from '../services/mockData';

interface TaskFilters {
  status: FilterStatus;
  category: string;
  search: string;
  sortBy: SortField;
}

interface TaskState {
  tasks: Task[];
  filters: TaskFilters;
  isAiLoading: boolean;
  aiInsight: string | null;

  // Actions
  addTask: (task: Omit<Task, 'id' | 'priorityScore' | 'priority' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleStatus: (id: string) => void;
  setFilter: (filter: Partial<TaskFilters>) => void;
  recomputePriorities: () => void;
  simulateAiPrioritization: () => Promise<void>;

  // Computed
  getFilteredTasks: () => Task[];
  getStats: () => { total: number; done: number; overdue: number; todayCount: number };
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: mockTasks,
  filters: {
    status: 'all',
    category: 'all',
    search: '',
    sortBy: 'priorityScore',
  },
  isAiLoading: false,
  aiInsight: null,

  addTask: (taskData) => {
    const raw = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const enriched = enrichTask(raw);
    set((state) => ({ tasks: [...state.tasks, enriched] }));
  },

  updateTask: (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map((t) => {
        if (t.id !== id) return t;
        const merged = { ...t, ...updates };
        return enrichTask(merged);
      }),
    }));
  },

  deleteTask: (id) => {
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
  },

  toggleStatus: (id) => {
    set((state) => ({
      tasks: state.tasks.map((t) => {
        if (t.id !== id) return t;
        const next = t.status === 'done' ? 'todo' : 'done';
        return { ...t, status: next };
      }),
    }));
  },

  setFilter: (filter) => {
    set((state) => ({ filters: { ...state.filters, ...filter } }));
  },

  recomputePriorities: () => {
    set((state) => ({
      tasks: state.tasks.map((t) => enrichTask(t)),
    }));
  },

  simulateAiPrioritization: async () => {
    set({ isAiLoading: true, aiInsight: null });
    // Simulate an AI call with a delay
    await new Promise((r) => setTimeout(r, 1800));
    const { tasks } = get();
    const sorted = sortTasksByPriority(tasks.filter((t) => t.status !== 'done'));
    const top = sorted[0];
    const insight = top
      ? `🧠 AI Insight: "${top.title}" should be your #1 focus today. It has the highest urgency-to-effort ratio (${top.priorityScore}). Consider blocking 2–3 hours of uninterrupted deep work for this.`
      : '✅ All high-priority tasks are complete. Great work!';
    set({ isAiLoading: false, aiInsight: insight });
  },

  getFilteredTasks: () => {
    const { tasks, filters } = get();
    let result = [...tasks];

    if (filters.status !== 'all') {
      result = result.filter((t) => t.status === filters.status);
    }
    if (filters.category !== 'all') {
      result = result.filter((t) => t.category === filters.category);
    }
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q) ||
          t.tags?.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'priorityScore':
          return (b.priorityScore ?? 0) - (a.priorityScore ?? 0);
        case 'due':
          return new Date(a.due).getTime() - new Date(b.due).getTime();
        case 'createdAt':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return result;
  },

  getStats: () => {
    const { tasks } = get();
    const now = new Date();
    const todayEnd = new Date(now);
    todayEnd.setHours(23, 59, 59, 999);
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);

    return {
      total: tasks.length,
      done: tasks.filter((t) => t.status === 'done').length,
      overdue: tasks.filter(
        (t) => t.status !== 'done' && new Date(t.due) < now
      ).length,
      todayCount: tasks.filter((t) => {
        const due = new Date(t.due);
        return due >= todayStart && due <= todayEnd && t.status !== 'done';
      }).length,
    };
  },
}));
