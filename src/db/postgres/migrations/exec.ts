import "dotenv/config";

import fs from "node:fs";
import path from "node:path";

import { pool } from "../client";

async function execute() {
  const client = await pool.connect();
  try {
    const files = await fs.readdirSync(__dirname);
    const filesSQL = files.filter((file) => path.extname(file) === ".sql");

    for (const file of filesSQL) {
      const filePath = path.join(__dirname, file);
      console.log(`Running migration file: ${file}`);

      const sql = await fs.readFileSync(filePath, "utf-8");
      await client.query(sql);
    }

    console.log("Executing migration...");
  } catch (error) {
    console.log("Migration failed:", error);
  } finally {
    client.release();
  }
}

execute();
