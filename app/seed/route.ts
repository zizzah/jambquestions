// app/seed/route.ts (or wherever your seed route is located)
import { NextResponse } from 'next/server';
import { seedUsers } from './seedUsers';


export async function GET() {
  try {
    console.log('Starting database seeding...');
    
    // Seed users table
    const usersResult = await seedUsers();
    
    if (!usersResult.success) {
      return NextResponse.json(
        { 
          error: 'Failed to seed users table',
          details: usersResult.error 
        },
        { status: 500 }
      );
    }

    // You can add other seeding functions here if needed
    // const otherResult = await seedOtherTable();

    return NextResponse.json({
      message: 'Database seeded successfully!',
      results: {
        users: usersResult
      }
    });

  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { 
        error: 'Database seeding failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}