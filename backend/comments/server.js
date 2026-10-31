import "dotenv/config";

import app from "./src/app.js";
import database from "./src/config/database.js";
import redis from "./src/config/redis.js";
import { producer } from "./src/config/kafka.js";

const PORT = process.env.PORT || 3002;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function retryConnection(name, connectFn, delay = 5000) {
  while (true) {
    try {
      await connectFn();
      console.log(`${name} connected`);
      return;
    } catch (error) {
      console.error(`${name} unavailable. Retrying in ${delay / 1000}s...`);
      await sleep(delay);
    }
  }
}

async function startServer() {
  try {
    // PostgreSQL

    await retryConnection("Postgres", async () => {
      await database.authenticate();
      await database.sync();
    });

    await retryConnection("Redis", async () => {
      if (!redis.isOpen) {
        await redis.connect();
      }
    });

    await retryConnection("Kafka", async () => {
      await producer.connect();
    });

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`App is listening on PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server: ", error);
    process.exit(1);
  }
}

startServer();
