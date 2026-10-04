'use client';

import React, { useState } from 'react';
import { TaskItem } from '@/types/api-todo';
import { todoService } from '@/services/todoService';
import { Badge } from '@/app/components/ui/badge';

interface ApiTodoListProps {
  initialTasks: TaskItem[];
}

export default function ApiTodoList({ initialTasks }: ApiTodoListProps) {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [error, setError] = useState('');

  const handleToggleTask = async (id: number, currentCompleted: boolean) => {
    const targetStatus = !currentCompleted;

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: targetStatus } : t))
    );

    try {
      await todoService.updateTodo(id, { is_completed: targetStatus });
    } catch (err) {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, completed: currentCompleted } : task))
      );
      setError(err instanceof Error ? err.message : 'Gagal memperbarui tugas.');
    }
  };

  return (
    <div className="space-y-4">
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-dark-70">Daftar Tugas</h2>
        <span className="text-xs bg-gray-70 text-gray-600 px-2.5 py-1 rounded-full font-medium">
          {tasks.length} item
        </span>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => handleToggleTask(task.id, task.completed)}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
              task.completed
                ? 'bg-success-10/20 border-success-20'
                : 'bg-white border-gray-100 hover:border-primary-70/40'
            }`}
          >
            <div className="flex items-center gap-3.5 flex-1">
              <input
                type="checkbox"
                checked={task.completed}
                readOnly
                className="h-5 w-5 cursor-pointer accent-primary-70"
              />
              <p
                className={`text-sm font-medium ${
                  task.completed ? 'line-through text-gray-400' : 'text-dark-70'
                }`}
              >
                {task.title}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="purple" size="default">ID: #{task.id}</Badge>
              <Badge variant={task.completed ? 'green' : 'yellow'} size="default">
                {task.completed ? 'Selesai' : 'Pending'}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}