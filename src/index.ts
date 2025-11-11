import "dotenv/config";

import { postgresHelper } from "./db/postgres/helper";

async function teste() {
  const data = await postgresHelper("SELECT 1 + 1 as result", []);
  console.log(data);
}

teste();
