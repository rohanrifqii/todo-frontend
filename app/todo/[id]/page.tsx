import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTodoById } from '@/lib/todos';
import { Badge } from '@/app/components/ui/badge';

type TodoDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TodoDetailPage({ params }: TodoDetailPageProps) {
  const { id } = await params;
  const todo = await getTodoById(id);

  if (!todo) {
    notFound();
  }

  return (
    <main className="min-h-screen p-6 md:p-10 bg-white text-dark-70">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-semibold text-primary-70 hover:underline mb-6"
          >
            ← Kembali ke Daftar Utama
          </Link>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <h1 className="text-2xl font-bold text-dark-70">{todo.title}</h1>
              <Badge variant={todo.completed ? 'green' : 'yellow'} size="default">
                {todo.completed ? 'Selesai' : 'Pending'}
              </Badge>
            </div>

            <div className="pt-4 border-t flex justify-between text-xs text-muted">
              <span>ID: #{todo.id}</span>
              <span>Dibuat: {todo.createdAt}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}