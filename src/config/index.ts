import dotenv from "dotenv";
dotenv.config();

const mongo_uri: string = process.env.MONGO_URI || "";
const PORT: number = process.env.PORT ? Number(process.env.PORT) : 5000;
const ROUNDS: number = process.env.ROUNDS ? Number(process.env.ROUNDS) : 10;

export const config = {
  mongo: {
    mongo_uri: mongo_uri,
  },
  server: {
    port: PORT,
    rounds: ROUNDS,
  },
};
