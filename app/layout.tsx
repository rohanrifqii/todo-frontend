import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aplikasi Todo List Next.js',
  description: 'Belajar App Router Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm">
          <Link href="/" className="text-xl font-bold text-blue-600">
            TodoApp
          </Link>
          <div className="flex gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-blue-600">
              Login
            </Link>
            <Link href="/register" className="text-sm font-medium text-gray-600 hover:text-blue-600">
              Register
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}