// import { createClient, RedisClientType } from "redis";
// const DEFAULT_EXPIRY = 3600;

// // Create and configure the Redis client
// const redisClient: RedisClientType = createClient({
//   socket: {
//     host: "localhost", // Your Redis host
//     port: 6379, // Your Redis port
//   },
// });

// // Initialize Redis connection
// export const connectRedis = async (): Promise<void> => {
//   try {
//     if (!redisClient.isOpen) {
//       await redisClient.connect();
//       console.log("Connected to Redis server.");
//     }
//   } catch (error) {
//     console.error("Error connecting to Redis:", error);
//     throw error;
//   }
// };

// // Handle Redis errors
// redisClient.on("error", (err) => {
//   console.error("Redis Client Error:", err);
// });

// export const getRedisCache = async <T>(key: string): Promise<T | null> => {
//   try {
//     const cache = await redisClient.get(key);
//     if (cache) return JSON.parse(cache) as T;
//     return null;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

// export const setRedisCache = async <T>(key: string, data: T) => {
//   try {
//     const cacheset = await redisClient.setEx(
//       key,
//       DEFAULT_EXPIRY,
//       JSON.stringify(data)
//     );
//     console.log("cache set", cacheset);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getOrSetCache = async <T>(key: string, cb: () => Promise<T>) => {
//   try {
//     const cachedData = await redisClient.get(key);
//     if (cachedData) {
//       console.log("cache hit!");
//       return JSON.parse(cachedData) as T;
//     }
//     console.log("cache miss, fetching from database!");
//     const data = await cb();
//     await redisClient.setEx(key, DEFAULT_EXPIRY, JSON.stringify(data));
//     return data;
//   } catch (error) {
//     console.log("redis getorset error: ", error);
//     throw error;
//   }
// };

import { createClient } from "redis";
const DEFAULT_EXPIRY = 3600;
import { config } from "../config";

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
      await client.set("name", "Atif");
      await client.set("age", 100);
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
  expiry = DEFAULT_EXPIRY
) => {
  try {
    const cachedData = await client.get(key);
    if (cachedData) {
      console.log("cache hit!");
      return JSON.parse(cachedData) as T;
    }
    console.log("cache miss, fetching from database!");
    const data = await cb();
    await client.setEx(key, expiry, JSON.stringify(data));
    return data;
  } catch (error) {
    console.log("redis getorset error: ", error);
    throw error;
  }
};
