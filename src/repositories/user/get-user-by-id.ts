import { postgresHelper } from "@/db/postgres/helper";

export interface GetUserByIdRepositoryOutput {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export class GetUserByIdRepository {
  async execute(userId: string): Promise<GetUserByIdRepositoryOutput> {
    const results = await postgresHelper<GetUserByIdRepositoryOutput>(
      `
        select
          u.id,
          u.first_name,
          u.last_name,
          u.email
        from users u
        where u.id = $1
      `,
      [userId],
    );

    return results[0];
  }
}
