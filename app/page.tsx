import TodoApp from './components/TodoApp';

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl rounded-2xl border border-gray-100 bg-white p-6 shadow-xl md:p-8">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Daftar Tugas (Todo List)
        </h1>
        <TodoApp />
      </div>
    </main>
  );
}
