import { postgresHelper } from "@/db/postgres/helper";

export interface CreateUserRepositoryInput {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface CreateUserRepositoryOutput {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export class CreateUserRepository {
  async execute(
    data: CreateUserRepositoryInput,
  ): Promise<CreateUserRepositoryOutput> {
    const results = await postgresHelper<CreateUserRepositoryOutput>(
      `
        insert into "users" (id, first_name , last_name , email , "password" )
        values (
          $1,
          $2,
          $3,
          $4,
          $5
        )
        returning id, first_name , last_name , email;
      `,
      [data.id, data.first_name, data.last_name, data.email, data.password],
    );

    return results[0];
  }
}
