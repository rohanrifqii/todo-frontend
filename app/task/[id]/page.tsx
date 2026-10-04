'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TaskDetailCard from './components/TaskDetailCard';
import TaskNotFound from './components/TaskNotFound';
import { authService } from '@/services/authService';
import { todoService } from '@/services/todoService';
import type { Todo } from '@/types/todo';

export default function TodoDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authService.getToken()) {
      router.replace('/login');
      return;
    }

    let active = true;
    const loadTodo = async () => {
      try {
        const result = await todoService.getTodoById(id);
        if (active) setTodo(result);
      } catch {
        if (active) setTodo(null);
      } finally {
        if (active) setLoading(false);
      }
    };

    void loadTodo();
    return () => {
      active = false;
    };
  }, [id, router]);

  if (loading) {
    return <main className="p-8 text-center text-gray-600">Memuat detail tugas...</main>;
  }
  if (!authService.getToken()) return null;
  if (!todo) return <TaskNotFound id={id} />;

  return <TaskDetailCard todo={todo} />;
}
