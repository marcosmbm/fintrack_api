import { postgresHelper } from "@/db/postgres/helper";

export interface GetUserByEmailRepositoryOutput {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export class GetUserByEmailRepository {
  async execute(email: string): Promise<GetUserByEmailRepositoryOutput> {
    const results = await postgresHelper<GetUserByEmailRepositoryOutput>(
      `
        select
          u.id,
          u.first_name,
          u.last_name,
          u."password"
        from users u
        where u.email = $1
      `,
      [email],
    );

    return results[0];
  }
}
