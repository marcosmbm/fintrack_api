import { Request } from "express";
import validator from "validator";

import { UpdateUserUseCase } from "@/use-cases";

import { badRequest, errorHandler, ok } from "../helpers";

export class UpdateUserController {
  async execute(req: Request) {
    try {
      const data = req.body;
      const user_id = req.params.userId;

      const userIdIsValid = validator.isUUID(user_id);

      if (!userIdIsValid) {
        return badRequest({ message: "Invalid uuid." });
      }

      const fields = ["first_name", "last_name", "email"];

      for (const key in data) {
        const keyIsValid = fields.includes(key);

        if (!keyIsValid) {
          return badRequest({ message: `Invalid field: ${key}.` });
        }
      }

      if (data.first_name) {
        if (validator.isEmpty(data.first_name)) {
          return badRequest({ message: "First name cannot be empty." });
        }
      }

      if (data.last_name) {
        if (validator.isEmpty(data.last_name)) {
          return badRequest({ message: "Last name cannot be empty." });
        }
      }

      if (data.email) {
        const emailIsValid = validator.isEmail(data.email);

        if (!emailIsValid) {
          return badRequest({ message: "Invalid email." });
        }
      }

      const user = await new UpdateUserUseCase().execute({
        ...data,
        user_id,
      });

      return ok(user);
    } catch (error) {
      return errorHandler(error);
    }
  }
}
