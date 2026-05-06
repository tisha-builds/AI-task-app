/**
 * API client — currently uses mock data.
 * Replace BASE_URL and enable real fetches in Stage 2 of migration.
 */
import type { Task } from '../types';
import { mockTasks } from './mockData';

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

// Toggle this to false when real backend is ready
const USE_MOCK = true;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json() as Promise<T>;
}

export const api = {
  async getTasks(): Promise<Task[]> {
    if (USE_MOCK) {
      return Promise.resolve([...mockTasks]);
    }
    return request<Task[]>('/tasks');
  },

  async createTask(task: Omit<Task, 'id' | 'priorityScore' | 'priority' | 'createdAt'>): Promise<Task> {
    if (USE_MOCK) {
      return Promise.resolve({ ...task, id: Date.now().toString(), createdAt: new Date().toISOString() } as Task);
    }
    return request<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    if (USE_MOCK) {
      const found = mockTasks.find((t) => t.id === id);
      return Promise.resolve({ ...found, ...updates } as Task);
    }
    return request<Task>(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  },

  async deleteTask(id: string): Promise<void> {
    if (USE_MOCK) return Promise.resolve();
    return request<void>(`/tasks/${id}`, { method: 'DELETE' });
  },
};
