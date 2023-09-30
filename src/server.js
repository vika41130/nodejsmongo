import express from "express";
import * as dotenv from "dotenv";
import { userRouter, studentRouter } from "./routes/index.js";
import connectToMongo from "./database/database.js";
import checkToken from "./middleware/authen.middleware.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(checkToken);

app.get("/", (req, res) => {
  res.send("root access");
});
app.use("/users", userRouter);
app.use("/students", studentRouter);

app.listen(process.env.PORT, async () => {
  await connectToMongo();
  console.log("App listening port", process.env.PORT);
});
