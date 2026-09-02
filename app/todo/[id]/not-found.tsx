import Link from 'next/link';

export default function TodoNotFound() {
  return (
    <main className="min-h-screen p-6 md:p-10 bg-white text-dark-70 flex items-center justify-center">
      <div className="text-center space-y-4 max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <h1 className="text-4xl font-extrabold text-primary-70">404</h1>
        <h2 className="text-xl font-bold text-dark-70">Tugas Tidak Ditemukan</h2>
        <p className="text-sm text-gray-500">
          Maaf, tugas yang kamu cari tidak ada atau telah dihapus.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 px-5 py-2.5 bg-primary-70 text-white font-medium text-sm rounded-lg transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}