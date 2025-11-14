import { postgresHelper } from "@/db/postgres/helper";

interface UpdateUserRepositoryInput {
  first_name?: string;
  last_name?: string;
  email?: string;
}

interface UpdateUserRepositoryOutput {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
}

export class UpdateUserRepository {
  async execute(
    userId: string,
    data: UpdateUserRepositoryInput,
  ): Promise<UpdateUserRepositoryOutput> {
    const params = [];
    let query = "";
    let index = 2;

    for (const key in data) {
      const value = data[key as keyof UpdateUserRepositoryInput];

      if (value && value !== "") {
        params.push(value);
        query += `${key} = $${index}, `;
        index++;
      }
    }

    if (params.length === 0) {
      throw new Error("No data provided to update user.");
    }

    query = query.slice(0, -2);

    const user = await postgresHelper<UpdateUserRepositoryOutput>(
      `
      update users u
      set ${query}
      where u.id  = $1
      returning id, first_name, last_name, email;
    `,
      [userId, ...params],
    );

    return user[0];
  }
}
