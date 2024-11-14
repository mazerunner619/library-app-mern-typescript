import app from "./app";
import { config } from "./config";
import { connectDataBase } from "./app";
const PORT = config.server.port;

(async () => {
  try {
    await connectDataBase();
    app.listen(PORT, () => {
      console.log(`server running on PORT : ${PORT}`);
    });
    // atif
  } catch (error: any) {
    console.log("server error: ", error.message);
  }
})();
