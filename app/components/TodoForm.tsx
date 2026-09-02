'use client';

import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';

type TodoFormProps = {
  onAddTodo: (title: string) => void;
};

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTodo(title.trim());
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tambahkan tugas baru..."
        className="flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-70"
      />
      <Button
        type="submit"
        disabled={!title.trim()}
        className="bg-primary-70 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
      >
        Tambah
      </Button>
    </form>
  );
}