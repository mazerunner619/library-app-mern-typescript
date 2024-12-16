import dotenv from "dotenv";
dotenv.config();

const mongo_uri: string = process.env.MONGO_URI || "";
const PORT: number = process.env.PORT ? Number(process.env.PORT) : 5000;
const ROUNDS: number = process.env.ROUNDS ? Number(process.env.ROUNDS) : 10;
const ORIGIN_ENDPOINT: string = process.env.ORIGIN_ENDPOINT || "*";
const REDIS_U = process.env.REDIS_USERNAME;
const REDIS_PWD = process.env.REDIS_PASSWORD;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = Number(process.env.REDIS_PORT);

export const config = {
  mongo: {
    mongo_uri: mongo_uri,
  },
  server: {
    port: PORT,
    rounds: ROUNDS,
    origin: ORIGIN_ENDPOINT,
  },
  redis: {
    username: REDIS_U,
    password: REDIS_PWD,
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
};
