import "dotenv/config";

import cors from "cors";
import express from "express";

import { env } from "./config";

const app = express();
const port = env.API_PORT;

app.use(cors());
app.use(express.json());

app.get("/teste", (_req, res) => {
  return res.json({ message: "Connected" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
