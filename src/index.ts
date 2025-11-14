import "dotenv/config";

import cors from "cors";
import express from "express";

import { env } from "./config";
import {
  CreateUserController,
  GetUserByIdController,
  UpdateUserController,
} from "./controllers";

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

app.get("/users/:id", async (req, res) => {
  const getUserByIdController = new GetUserByIdController();
  const { statusCode, body } = await getUserByIdController.execute(req);
  return res.status(statusCode).json(body);
});

app.patch("/users/:userId", async (req, res) => {
  const updateUserController = new UpdateUserController();
  const { statusCode, body } = await updateUserController.execute(req);
  return res.status(statusCode).json(body);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
