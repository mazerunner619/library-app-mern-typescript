import app from "./app";
import { config } from "./config";
import { connectDataBase } from "./app";
const PORT = config.server.port;
import { connectRedis } from "./utils/RedisClent";

(async () => {
  try {
    await connectDataBase();
    await connectRedis();
    app.listen(PORT, () => {
      console.log(`server running on PORT : ${PORT}`);
    });
  } catch (error: any) {
    console.log("server error: ", error.message);
  }
})();
