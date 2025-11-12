import "dotenv/config";

import cors from "cors";
import express from "express";

import { env } from "./config";
import { CreateUserController } from "./controllers";

const app = express();
const port = env.API_PORT;

app.use(cors());
app.use(express.json());

app.get("/teste", (_req, res) => {
  return res.json({ message: "Connected" });
});

//USERS
app.post("/users", async (req, res) => {
  const createUserController = new CreateUserController();
  const { statusCode, body } = await createUserController.execute(req);
  return res.status(statusCode).json(body);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
