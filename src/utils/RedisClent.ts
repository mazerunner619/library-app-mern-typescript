import { createClient } from "redis";
const DEFAULT_EXPIRY = 3600;
import { config } from "../config";
import { UserDoesNotExistError } from "./LibraryErrors";
const DEFAULT_CACHE_EXPIRY = 86400; // 24 hr
const client = createClient({
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

export const getOrSetCache = async <T>(key: string, cb: () => Promise<T>) => {
  try {
    const cachedData = await client.get(key);
    if (cachedData) {
      console.log("cache hit!");
      return JSON.parse(cachedData) as T;
    }
    const data = await cb();
    await client.setEx(key, DEFAULT_CACHE_EXPIRY, JSON.stringify(data));
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteKey = async (key: string) => {
  const deletekeyres = await client.del(key);
};
