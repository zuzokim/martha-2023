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

io.on("connect", (socket: any) => {
  console.log("🐸socket connected!");

  socket.on("disconnect", (reason: any) => {
    console.log(`🙈socket disconnected. reason: '${reason}'`);
  });

  socket.on(
    "CreateMap",
    (
      message: any //jobType(COSMIC | DIGITAL | HUMAN) | Loading | Created | Error
    ) => {
      io.sockets.emit("CreateMap", message);
      console.log("CreateMap : ", message);
    }
  );

  socket.on(
    "OnPlay",
    (
      message: any //Playing | Exiting | TriggerFound |  Error
    ) => {
      io.sockets.emit("OnPlay", message);
      console.log("OnPlay : ", message);
    }
  );
  socket.on(
    "GameOver",
    (
      message: any //Normal | Hidden
    ) => {
      io.sockets.emit("GameOver", message);
      console.log("GameOver : ", message);
    }
  );
  socket.on(
    "Init",
    (
      message: any // Init | Inited | Error
    ) => {
      io.sockets.emit("Init", message);
      console.log("Init : ", message);
    }
  );
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
