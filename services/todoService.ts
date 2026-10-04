import type { Todo } from '@/types/todo';
import { apiClient } from './api';

type TodoRecord = {
  id?: number;
  todo?: string;
  task?: string;
  title?: string;
  completed?: boolean;
  is_completed?: boolean | number;
  createdAt?: string;
  created_at?: string;
};

type ApiEnvelope = {
  data?: unknown;
  items?: unknown;
  todos?: unknown;
};

export const normalize = (value: unknown, fallbackTitle = ''): Todo | null => {
  if (!value || typeof value !== 'object') return null;
  const record = value as TodoRecord;
  if (typeof record.id !== 'number') return null;

  return {
    id: record.id,
    title: record.todo ?? record.task ?? record.title ?? fallbackTitle,
    completed: Boolean(record.completed ?? record.is_completed ?? false),
    createdAt: record.createdAt ?? record.created_at ?? '',
  };
};

const unwrapData = (response: unknown): unknown => {
  if (!response || typeof response !== 'object') return response;
  return (response as ApiEnvelope).data ?? response;
};

const extractList = (response: unknown): unknown[] => {
  const data = unwrapData(response);
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== 'object') return [];

  const record = data as ApiEnvelope;
  if (Array.isArray(record.items)) return record.items;
  if (Array.isArray(record.todos)) return record.todos;

  if (record.data && typeof record.data === 'object') {
    const nested = record.data as ApiEnvelope;
    if (Array.isArray(nested.items)) return nested.items;
    if (Array.isArray(nested.todos)) return nested.todos;
  }
  return [];
};

const requireTodo = (value: unknown, fallbackTitle = ''): Todo => {
  const todo = normalize(value, fallbackTitle);
  if (!todo) throw new Error('Data tugas dari server tidak valid');
  return todo;
};

export const todoService = {
  async getTodos(): Promise<Todo[]> {
    const response = await apiClient<unknown>('/todos?perPage=50');
    return extractList(response)
      .map((todo) => normalize(todo))
      .filter((todo): todo is Todo => todo !== null);
  },

  async getTodoById(id: number | string): Promise<Todo | null> {
    const response = await apiClient<unknown>(`/todos/${id}`);
    return normalize(unwrapData(response));
  },

  async createTodo(title: string): Promise<Todo> {
    const response = await apiClient<unknown>('/todos', {
      method: 'POST',
      body: JSON.stringify({ task: title }),
    });
    return requireTodo(unwrapData(response), title);
  },

  async updateTodo(
    id: number | string,
    payload: { task?: string; is_completed?: boolean }
  ): Promise<void> {
    await apiClient(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteTodo(id: number | string): Promise<void> {
    await apiClient(`/todos/${id}`, { method: 'DELETE' });
  },
};
