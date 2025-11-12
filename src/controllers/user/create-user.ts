import { Request } from "express";
import validator from "validator";

import { CreateUserUseCase } from "@/use-cases";

export class CreateUserController {
  async execute(req: Request) {
    try {
      const data = req.body;

      //validar campos obrigatórios
      const requiredFields = ["first_name", "last_name", "email", "password"];

      for (const field of requiredFields) {
        const isFieldMissing = !data[field];

        if (isFieldMissing) {
          throw new Error(`${field} is required.`);
        }
      }

      const isEmailValid = validator.isEmail(data.email);

      if (!isEmailValid) {
        throw new Error("Invalid email.");
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
        throw new Error("Password must be at least 6 characters long.");
      }

      const user = await new CreateUserUseCase().execute(data);

      //retornar a resposta para o client (status code 201 e body)
      return {
        statusCode: 201,
        body: user,
      };
    } catch (error: unknown) {
      return {
        statusCode: 500,
        body: {
          message:
            error instanceof Error ? error.message : "Internal server error",
        },
      };
    }
  }
}
