import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as schema from './schema.js';

// Ensure environment variable is available
if (!process.env.NEXT_PUBLIC_DRIZZLE_DB_URL) {
  throw new Error('Database URL is missing in the environment variables.');
}

// Create the Neon database connection and Drizzle ORM instance
const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);
const db = drizzle(sql, { schema });

// Function to execute raw SQL queries
export async function executeQuery(query) {
  try {
    const data = await sql.query(query); // Executes raw SQL query
    return data;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

// Function to fetch data using Drizzle ORM
export async function fetchDataWithDrizzle() {
  try {
    const result = await db.select().from(schema.MockInterview); // Example of Drizzle ORM query
    return result;
  } catch (error) {
    console.error('Error executing Drizzle query:', error);
    throw error;
  }
}

export default { executeQuery, fetchDataWithDrizzle };
