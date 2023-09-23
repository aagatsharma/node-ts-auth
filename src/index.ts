import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import router from "./router";
import mongoose from "mongoose";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const MONGO_LOCAL = "mongodb://localhost:27017/learn-auth";
const PORT = 8080;

app.use("/", router());

mongoose
  .connect(MONGO_LOCAL)
  .then(() => {
    //listening on port
    app.listen(PORT, () => {
      console.log(`Connected to DB and Listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
