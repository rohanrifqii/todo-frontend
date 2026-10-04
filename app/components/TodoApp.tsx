'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiError } from '@/services/api';
import { authService } from '@/services/authService';
import { todoService } from '@/services/todoService';
import type { Todo } from '@/types/todo';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export default function TodoApp() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleUnauthorized = useCallback(
    (reason: unknown): boolean => {
      if (reason instanceof ApiError && (reason.status === 401 || reason.status === 403)) {
        authService.logout();
        router.replace('/login');
        return true;
      }
      return false;
    },
    [router]
  );

  useEffect(() => {
    if (!authService.getToken()) {
      router.replace('/login');
      return;
    }

    let active = true;
    const loadTodos = async () => {
      try {
        const loadedTodos = await todoService.getTodos();
        if (active) setTodos(loadedTodos);
      } catch (reason) {
        if (!handleUnauthorized(reason) && active) {
          setError(reason instanceof Error ? reason.message : 'Gagal memuat tugas.');
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    void loadTodos();
    return () => {
      active = false;
    };
  }, [handleUnauthorized, router]);

  const handleAdd = async (title: string) => {
    setError('');
    const temporaryId = -Date.now();
    const temporaryTodo: Todo = {
      id: temporaryId,
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((current) => [temporaryTodo, ...current]);

    try {
      const createdTodo = await todoService.createTodo(title);
      setTodos((current) =>
        current.map((todo) => (todo.id === temporaryId ? createdTodo : todo))
      );
    } catch (reason) {
      setTodos((current) => current.filter((todo) => todo.id !== temporaryId));
      if (!handleUnauthorized(reason)) {
        setError(reason instanceof Error ? reason.message : 'Gagal menambahkan tugas.');
      }
    }
  };

  const handleToggle = async (id: number) => {
    const target = todos.find((todo) => todo.id === id);
    if (!target) return;

    const completed = !target.completed;
    setError('');
    setTodos((current) =>
      current.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );

    try {
      await todoService.updateTodo(id, { is_completed: completed });
    } catch (reason) {
      setTodos((current) =>
        current.map((todo) =>
          todo.id === id ? { ...todo, completed: target.completed } : todo
        )
      );
      if (!handleUnauthorized(reason)) {
        setError(reason instanceof Error ? reason.message : 'Gagal memperbarui tugas.');
      }
    }
  };

  const handleDelete = async (id: number) => {
    setError('');
    try {
      await todoService.deleteTodo(id);
      setTodos((current) => current.filter((todo) => todo.id !== id));
    } catch (reason) {
      if (!handleUnauthorized(reason)) {
        setError(reason instanceof Error ? reason.message : 'Gagal menghapus tugas.');
      }
    }
  };

  const handleLogout = () => {
    authService.logout();
    router.replace('/login');
  };

  if (loading) {
    return <p className="py-4 text-center text-sm text-gray-500">Memuat tugas...</p>;
  }

  return (
    <>
      {error && (
        <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
      <div className="mt-6 border-t border-gray-200 pt-4">
        <button
          type="button"
          onClick={handleLogout}
          className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Logout →
        </button>
      </div>
    </>
  );
}
