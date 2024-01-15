import { registerAs } from '@nestjs/config'

export default registerAs('config', () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  database: {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  auth: {
    hash: process.env.HASH_SALT,
    secret: process.env.JWT_SECRET,
  },
}))
