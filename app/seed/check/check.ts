import postgres from 'postgres';
import fs from 'fs';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function exportDatabase() {
  try {
    const tables = [
      'users',
      'subjects',
      'questions',
      'user_progress',
      'practice_sessions',
      'user_answers',
      'goals',
      'notifications',
      'user_statistics',
      'activity_log',
    ];

    const dbData: Record<string, unknown[]> = {};

    for (const table of tables) {
      const result = await sql`SELECT * FROM ${sql(table)}`;
      dbData[table] = result;
    }

    // Write data to a JSON file
    fs.writeFileSync('database_dump.json', JSON.stringify(dbData, null, 2));

    console.log('Database data has been successfully exported!');
  } catch (error) {
    console.error('Error exporting database:', error);
  } finally {
    await sql.end(); // Close the database connection
  }
}

exportDatabase();