import dotenv from "dotenv";
dotenv.config();

const mongo_uri: string = process.env.MONGO_URI || "";
const PORT: number = process.env.PORT ? Number(process.env.PORT) : 5000;
const ROUNDS: number = process.env.ROUNDS ? Number(process.env.ROUNDS) : 10;
const ORIGIN_ENDPOINT: string = process.env.ORIGIN_ENDPOINT || "*";

export const config = {
  mongo: {
    mongo_uri: mongo_uri,
  },
  server: {
    port: PORT,
    rounds: ROUNDS,
    origin: ORIGIN_ENDPOINT,
  },
};
