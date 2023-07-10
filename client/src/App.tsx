import { useEffect, useState } from "react";
import { io, connect } from "socket.io-client";

function App() {

  const URL = `http://localhost:8000`;
  const socket = connect(URL);

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    socket.on("message", (data) => {
      setLastMessage(data);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  }, [socket]);

  const sendMessage = () => {
    socket.emit("message", "Hello! Martha");
    // TODO: https://socket.io/docs/v4/emitting-events/
  };

  return (
    <>
      <div>
        <p>Connected: {"" + isConnected}</p>
        <p>Last message: {lastMessage || "-"}</p>
        <button onClick={sendMessage}>send message</button>
        <p>한글 폰트 적용</p>
      </div>
    </>
  );
}

export default App;
