import { Todo } from '@/types/todo';

export const initialDummyTodos: Todo[] = [
  {
    id: 1,
    title: 'Membuat Struktur Project Next.js',
    description: 'Mengatur folder app router, components, dan styling.',
    completed: true,
    createdAt: '2026-03-01',
  },
  {
    id: 2,
    title: 'Integrasi Local Storage Cache',
    description: 'Membuat custom hook useLocalStorage untuk simpan state.',
    completed: false,
    createdAt: '2026-03-02',
  },
  {
    id: 3,
    title: 'Integrasi API DummyJSON',
    description: 'Fetch data todo eksternal melalui service layer.',
    completed: false,
    createdAt: '2026-03-03',
  },
];

export async function getTodos(): Promise<Todo[]> {
  return initialDummyTodos;
}

export async function getTodoById(id: number | string): Promise<Todo | null> {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  const todo = initialDummyTodos.find((t) => t.id === numericId);
  return todo || null;
}