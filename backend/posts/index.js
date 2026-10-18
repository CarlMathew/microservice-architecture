import "dotenv/config";
import express from "express";
import cors from "cors";

import database from "./config/database.js";
import redis from "./config/redis.js";
import { producer } from "./config/kafka.js";

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Post service is running" });
});

async function startServer() {
  try {
    await database.query("SELECT 1");
    console.log("PostgreSQL Connected");

    await redis.connect();
    console.log("Redis Connected");

    await producer.connect();
    console.log("Kafka produce connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`App is listening on PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Startup Failed: ", error);
    process.exit(1);
  }
}

startServer();
