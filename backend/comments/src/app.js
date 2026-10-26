import cors from "cors";
import express from "express";

import commentRoutes from "./routes/comment.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/comments", commentRoutes);

export default app;
