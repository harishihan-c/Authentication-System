import dotenv from "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ConnectDB from "./config/database.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();
const port = process.env.PORT || 3000;

// const allowedOrigins = ['https://authentication-system-frontend-topaz.vercel.app']

ConnectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://authentication-system-frontend-topaz.vercel.app/",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// // Handle preflight requests
// app.options("*", cors({
//   origin: "https://authentication-system-frontend-topaz.vercel.app/",
//   credentials: true,
// }));

//Api EndPoints
app.get("/", (req, res) => {
  res.send("Api Working");
});
app.use("api/auth", authRouter);
app.use("api/user", userRouter);

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
