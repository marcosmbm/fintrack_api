import { EmailAreadyInUseError, UserNotFoundError } from "@/errors";
import {
  GetUserByEmailRepository,
  GetUserByIdRepository,
  UpdateUserRepository,
} from "@/repositories";

interface UpdateUserUseCaseInput {
  first_name?: string;
  last_name?: string;
  email?: string;
  user_id: string;
}

export class UpdateUserUseCase {
  async execute(data: UpdateUserUseCaseInput) {
    const user = await new GetUserByIdRepository().execute(data.user_id);

    if (!user) {
      throw new UserNotFoundError(data.user_id);
    }

    if (data.email) {
      const userWithSameEmail = await new GetUserByEmailRepository().execute(
        data.email,
      );
      if (userWithSameEmail && userWithSameEmail.id !== data.user_id) {
        throw new EmailAreadyInUseError(data.email);
      }
    }

    return new UpdateUserRepository().execute(data.user_id, {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
    });
  }
}
