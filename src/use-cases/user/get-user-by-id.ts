import { UserNotFoundError } from "@/errors";
import { GetUserByIdRepository } from "@/repositories";

export class GetUserByIdUseCase {
  async execute(userId: string) {
    const user = await new GetUserByIdRepository().execute(userId);

    if (!user) {
      throw new UserNotFoundError(userId);
    }

    return user;
  }
}
