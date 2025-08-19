// Create this file: /api/debug/subjects/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { debugUserSubjects, syncUserSubjects, findCorrectSubjectName } from '@/app/lid/database/practice';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const subjectName = searchParams.get('subject');

    switch (action) {
      case 'debug':
        await debugUserSubjects(session.user.id);
        return NextResponse.json({ message: 'Debug info logged to console' });
      
      case 'sync':
        await syncUserSubjects(session.user.id);
        return NextResponse.json({ message: 'Subjects synced successfully' });
      
      case 'find':
        if (!subjectName) {
          return NextResponse.json({ error: 'Subject name required' }, { status: 400 });
        }
        const foundName = await findCorrectSubjectName(session.user.id, subjectName);
        return NextResponse.json({ 
          searchedFor: subjectName,
          foundName: foundName,
          match: foundName ? 'found' : 'not_found'
        });
      
      default:
        return NextResponse.json({ 
          error: 'Invalid action. Use: debug, sync, or find' 
        }, { status: 400 });
    }
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Also handle POST for testing practice result saving
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, subjectName, score, totalQuestions } = body;

    if (action === 'test_save') {
      // Import the function here to avoid circular imports
      const { savePracticeResults } = await import('@/app/lid/database/practice');
      
      await savePracticeResults(
        session.user.id,
        subjectName || 'Mathematics',
        score || 8,
        totalQuestions || 10,
        5 // 5 minutes
      );
      
      return NextResponse.json({ 
        message: 'Test practice results saved successfully',
        userId: session.user.id,
        subjectName: subjectName || 'Mathematics',
        score: score || 8,
        totalQuestions: totalQuestions || 10
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Debug POST API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}