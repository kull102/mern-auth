import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

import router from "./router";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

console.log("hi world!");

const server = http.createServer(app);

server.listen(9090, () => {
  console.log("Server listening on port http://localhost:9090");
});

const MONGO_URL = "mongodb+srv://admin:admin@cluster0.vncmikh.mongodb.net/";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (e: Error) => console.log(e));

app.use("/", router());
