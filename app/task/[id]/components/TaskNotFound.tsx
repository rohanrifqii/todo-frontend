import Link from 'next/link';

export default function TaskNotFound({ id }: { id: string }) {
  return (
    <main className="min-h-screen p-6 md:p-10 bg-white">
      <div className="max-w-2xl mx-auto p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
        <h1 className="text-xl font-bold text-gray-800">Tugas tidak ditemukan</h1>
        <p className="text-sm text-gray-500 mt-2">Tugas dengan ID #{id} tidak ada.</p>
        <Link
          href="/"
          className="inline-block mt-4 text-xs font-semibold bg-gray-100 px-3.5 py-2 rounded-lg"
        >
          ← Kembali ke Daftar
        </Link>
      </div>
    </main>
  );
}