import http from "http";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { Server } from "socket.io";
// import socket from "./socket.ts";

const app: Express = express();
const port = 8000;

app.set("port", port);

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on("connection", (socket: any) => {
  console.log("🐸socket connected!");

  socket.on("disconnect", (reason: any) => {
    console.log(`🙈socket disconnected. reason: '${reason}'`);
  });

  socket.on("message", (message: any) => {
    io.sockets.emit("message", message);
    console.log("message arrived : ", message);
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Typescript + Node.js + Express Server");
});

server.listen(port, () => {
  console.log(`  
  ################################################
  👾 [server]: Server is running on port:${port}
  ################################################
  `);
});
