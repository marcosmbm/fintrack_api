import { pool } from "./client";

export async function postgresHelper<T = unknown>(
  query: string,
  params: string[],
): Promise<T[]> {
  const client = await pool.connect();

  const data = await client.query(query, params);

  client.release();

  return data.rows;
}
