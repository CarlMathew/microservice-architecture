import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Comments service is running" });
});

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});
