import { createClient } from "redis";
import { config } from "../config";
import { UserDoesNotExistError } from "./LibraryErrors";
const DEFAULT_CACHE_EXPIRY = 86400; // 24 hr
export const client = createClient({
  username: config.redis.username,
  password: config.redis.password,
  socket: {
    host: config.redis.host,
    port: Number(config.redis.port),
  },
});

export const connectRedis = async () => {
  try {
    if (!client.isOpen) {
      await client.connect();
      console.log("connected to redis");
    }
  } catch (error) {
    console.log("redis connection error: ", error);
    throw error;
  }
};

client.on("error", (err) => console.log("Redis Client Error", err));

export const getOrSetCache = async <T>(
  key: string,
  cb: () => Promise<T>,
  expiry: number = DEFAULT_CACHE_EXPIRY
) => {
  try {
    const cachedData = await client.get(key);
    if (cachedData) {
      return JSON.parse(cachedData) as T;
    }
    const data = await cb();
    await client.setEx(key, expiry, JSON.stringify(data));
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteKey = async (key: string) => {
  const deletekeyres = await client.del(key);
};
