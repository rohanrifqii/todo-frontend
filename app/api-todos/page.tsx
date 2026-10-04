'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ApiTodoList from './components/ApiTodoList';
import { authService } from '@/services/authService';
import { todoService } from '@/services/todoService';
import type { TaskItem } from '@/types/api-todo';

export default function ApiTodosPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authService.getToken()) {
      router.replace('/login');
      return;
    }

    let active = true;
    const loadTasks = async () => {
      try {
        const todos = await todoService.getTodos();
        if (active) {
          setTasks(
            todos.map(({ id, title, completed }) => ({ id, title, completed }))
          );
        }
      } catch (reason) {
        if (active) {
          setError(reason instanceof Error ? reason.message : 'Gagal memuat tugas.');
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    void loadTasks();
    return () => {
      active = false;
    };
  }, [router]);

  return (
    <main className="min-h-screen bg-white p-6 text-gray-800 md:p-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl md:p-8">
          <header className="mb-6 border-b border-gray-100 pb-4">
            <h1 className="text-center text-2xl font-bold md:text-3xl">
              Daftar Tugas (API Integration)
            </h1>
          </header>
          {loading ? (
            <p className="text-center text-sm text-gray-500">Memuat tugas...</p>
          ) : error ? (
            <p role="alert" className="text-sm text-red-600">{error}</p>
          ) : (
            <ApiTodoList initialTasks={tasks} />
          )}
        </div>
      </div>
    </main>
  );
}
