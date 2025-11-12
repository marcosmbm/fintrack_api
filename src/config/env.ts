export const env = {
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: Number(process.env.DATABASE_PORT),
  DATABASE_NAME: process.env.DATABASE_NAME,
  API_PORT: Number(process.env.API_PORT),
  BCRYPT_SALT: Number(process.env.BCRYPT_SALT),
};
