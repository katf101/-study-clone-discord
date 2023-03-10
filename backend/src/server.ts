import express, { Express } from "express";
import { router as authRoutes } from "./routes/authRoutes";
import { router as friendInvitationRoutes } from "./routes/friendInvitationRoutes";
// import { Application, json, urlencoded, Response, Request, NextFunction } from 'express';
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { registerSocketServer } from "./soketServer";

dotenv.config();

const PORT = process.env.PORT || process.env.API_PORT;
const DB: string | undefined = process.env.MONGODB_URI || "";

const app: Express = express();
app.use(express.json());
app.use(cors());

// register routes
app.use("/api/auth", authRoutes);
app.use("/api/friend-invitation", friendInvitationRoutes);

const server = http.createServer(app);
registerSocketServer(server);

mongoose
  .connect(DB)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on ${PORT} `);
    });
  })
  .catch((err) => {
    console.log("DB 연결 실패...");
  });
