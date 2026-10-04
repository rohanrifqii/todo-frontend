import { todoService } from '@/services/todoService';
import type { TaskItem } from '@/types/api-todo';

export type FetchTodosParams = {
  limit?: number;
  skip?: number;
};

export async function getTasks(params: FetchTodosParams = {}): Promise<{
  tasks: TaskItem[];
  total: number;
  limit: number;
  skip: number;
}> {
  const todos = await todoService.getTodos();
  const limit = params.limit ?? todos.length;
  const skip = params.skip ?? 0;
  const tasks = todos.slice(skip, skip + limit).map(({ id, title, completed }) => ({
    id,
    title,
    completed,
  }));

  return { tasks, total: todos.length, limit, skip };
}

export async function getTaskById(id: number | string): Promise<TaskItem | null> {
  const todo = await todoService.getTodoById(id);
  return todo
    ? { id: todo.id, title: todo.title, completed: todo.completed }
    : null;
}
