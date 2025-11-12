import { Request } from "express";
import validator from "validator";

import { CreateUserUseCase } from "@/use-cases";

import { badRequest, created, errorHandler } from "../helpers";

export class CreateUserController {
  async execute(req: Request) {
    try {
      const data = req.body;

      //validar campos obrigatórios
      const requiredFields = ["first_name", "last_name", "email", "password"];

      for (const field of requiredFields) {
        const isFieldMissing = !data[field];

        if (isFieldMissing) {
          return badRequest({ message: `Missing field: ${field}` });
        }
      }

      const isEmailValid = validator.isEmail(data.email);

      if (!isEmailValid) {
        return badRequest({ message: "Invalid email." });
      }

      //validar tamanho de senha
      const isPasswordValid = validator.isStrongPassword(data.password, {
        minLength: 6,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      });

      if (!isPasswordValid) {
        return badRequest({
          message: "Password must be at least 6 characters long.",
        });
      }

      const user = await new CreateUserUseCase().execute(data);

      //retornar a resposta para o client (status code 201 e body)
      return created(user);
    } catch (error: unknown) {
      return errorHandler(error);
    }
  }
}
