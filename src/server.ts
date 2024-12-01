import app from "./app";
import { config } from "./config";
import { connectDataBase } from "./app";
import registerGraphQlRoute from "./graphql/graphql";

const PORT = config.server.port;

(async () => {
  try {
    await connectDataBase();
    await registerGraphQlRoute(app);
    app.listen(PORT, () => {
      console.log(`server running on PORT : ${PORT}`);
    });
  } catch (error: any) {
    console.log("server error: ", error.message);
  }
})();
