import { AnalyticsModel } from '@/models/Analytics';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const analyticsModel = await AnalyticsModel.getInstance();
    const summary = await analyticsModel.getAnalyticsSummary();

    return NextResponse.json(summary, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}