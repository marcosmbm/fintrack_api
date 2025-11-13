import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import { env } from "@/config";
import { EmailAreadyInUseError } from "@/errors";
import { CreateUserRepository, GetUserByEmailRepository } from "@/repositories";

export interface CreateUserUseCaseInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  async execute(data: CreateUserUseCaseInput) {
    const userAlreadyExists = await new GetUserByEmailRepository().execute(
      data.email,
    );

    if (userAlreadyExists) {
      throw new EmailAreadyInUseError(data.email);
    }

    const userId = uuidv4();
    const hashedPassword = bcrypt.hashSync(data.password, env.BCRYPT_SALT);

    return await new CreateUserRepository().execute({
      id: userId,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: hashedPassword,
    });
  }
}
