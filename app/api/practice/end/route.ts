import { NextRequest, NextResponse } from 'next/server';
import { savePracticeResults } from '@/app/lid/database/practice';

export async function POST(request: NextRequest) {
  try {
    const { userId, subjectName, score, totalQuestions, durationMinutes } = await request.json();

    if (!userId || !subjectName || score === undefined || !totalQuestions || durationMinutes === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, subjectName, score, totalQuestions, durationMinutes' },
        { status: 400 }
      );
    }

    await savePracticeResults(userId, subjectName, score, totalQuestions, durationMinutes);

    return NextResponse.json({ 
      success: true, 
      message: 'Practice results saved successfully',
      score,
      totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100)
    });
  } catch (error) {
    console.error('Error ending practice session:', error);
    return NextResponse.json(
      { error: 'Failed to save practice results' },
      { status: 500 }
    );
  }
} 