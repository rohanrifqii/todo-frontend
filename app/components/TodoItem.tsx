'use client';

import Link from 'next/link';
import type { Todo } from '@/types/todo';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Tandai ${todo.title} ${todo.completed ? 'belum selesai' : 'selesai'}`}
        className="h-5 w-5 cursor-pointer accent-blue-600"
      />
      <span className={`min-w-0 flex-1 break-words ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
        {todo.title}
      </span>
      <Link
        href={`/task/${todo.id}`}
        className="shrink-0 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
      >
        Detail →
      </Link>
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className="shrink-0 cursor-pointer rounded-md bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-100"
      >
        Hapus
      </button>
    </li>
  );
}