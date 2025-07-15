import { NextRequest, NextResponse } from 'next/server';
import { createPracticeSession } from '@/app/lid/database/practice';

export async function POST(request: NextRequest) {
  try {
    const { userId, subjectName, questionCount } = await request.json();

    if (!userId || !subjectName || !questionCount) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, subjectName, questionCount' },
        { status: 400 }
      );
    }

    const session = await createPracticeSession(userId, subjectName, questionCount);

    return NextResponse.json(session);
  } catch (error) {
    console.error('Error starting practice session:', error);
    return NextResponse.json(
      { error: 'Failed to start practice session' },
      { status: 500 }
    );
  }
} 