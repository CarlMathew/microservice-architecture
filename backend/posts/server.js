import "dotenv/config";

import app from "./src/app.js";
import database from "./src/config/database.js";
import redis from "./src/config/redis.js";
import { producer } from "./src/config/kafka.js";

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await database.authenticate();
    console.log("PostgreSQL connected");
    await database.sync();

    await redis.connect();
    console.log("Redis Connected");

    await producer.connect();
    console.log("Kafka produce connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`App is listening on PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server: ", error);
    process.exit(1);
  }
}

startServer();
