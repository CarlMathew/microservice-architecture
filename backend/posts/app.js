import express from "express";
import postRoutes from "./routes/post.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/posts", postRoutes);

export default app;
