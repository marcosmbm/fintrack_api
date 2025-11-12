import { Request } from "express";
import validator from "validator";

import { GetUserByIdUseCase } from "@/use-cases";

import { badRequest, errorHandler, ok } from "../helpers";

export class GetUserByIdController {
  async execute(req: Request) {
    try {
      const userId = req.params.id;

      const uuidIsValid = validator.isUUID(userId);

      if (!uuidIsValid) {
        return badRequest({ message: "Invalid uuid." });
      }

      const user = await new GetUserByIdUseCase().execute(userId);

      return ok(user);
    } catch (error: unknown) {
      return errorHandler(error);
    }
  }
}
