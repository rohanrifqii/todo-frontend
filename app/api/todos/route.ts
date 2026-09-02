import { NextRequest, NextResponse } from 'next/server';
import { getTasks } from '@/lib/tasks';
import { todoService } from '@/services/todoService';
import { ApiResponse } from '@/types/api-todo';

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const searchParams = request.nextUrl.searchParams;
  const limitParam = searchParams.get('limit');
  const skipParam = searchParams.get('skip');

  const limit = limitParam ? parseInt(limitParam, 10) : 10;
  const skip = skipParam ? parseInt(skipParam, 10) : 0;

  try {
    const result = await getTasks({ limit, skip });
    const latencyMs = Date.now() - startTime;
    const responsePayload: ApiResponse = {
      success: true,
      message: 'Koneksi ke DummyJSON API berhasil!',
      count: result.tasks.length,
      total: result.total,
      data: {
        ...result,
        latency: `${latencyMs}ms`,
      },
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(responsePayload, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Gagal terhubung ke DummyJSON API.',
        error: (error as Error).message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}