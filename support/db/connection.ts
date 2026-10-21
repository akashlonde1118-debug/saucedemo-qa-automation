import mysql, { Pool, RowDataPacket } from 'mysql2/promise';

let pool: Pool | undefined;

/**
 * Creates a pooled connection only when DB_ENABLED=true.
 * Never commit credentials; load them from the local .env or CI secrets.
 */
export function getDbPool(): Pool {
  if ((process.env.DB_ENABLED ?? 'false').toLowerCase() !== 'true') {
    throw new Error('Database access is disabled. Set DB_ENABLED=true and configure DB_* variables for a real test database.');
  }
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      connectionLimit: Number(process.env.DB_CONNECTION_LIMIT ?? 5),
      waitForConnections: true,
      queueLimit: 0
    });
  }
  return pool;
}

export async function queryRows<T extends RowDataPacket[]>(sql: string, params: any[] = []): Promise<T> {
  if (!/^\s*SELECT\b/i.test(sql)) {
    throw new Error('queryRows accepts SELECT statements only. Use a reviewed, parameterized write helper for other operations.');
  }
  const [rows] = await getDbPool().execute<T>(sql, params);
  return rows;
}

export async function closeDbPool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = undefined;
  }
}