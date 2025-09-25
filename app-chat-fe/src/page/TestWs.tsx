import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client, type IMessage } from "@stomp/stompjs";

const SOCKET_URL = "http://localhost:8080/ws";

export default function TestWs() {
  const clientRef = useRef<Client | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(SOCKET_URL),
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log("Connected to WebSocket");

      client.subscribe("/topic/messages", (message: IMessage) => {
        setMessages((prev) => [...prev, message.body]);
      });
    };

    client.onStompError = (frame) => {
      console.error("STOMP error", frame.headers["message"], frame.body);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, []);

  const sendMessage = () => {
    if (clientRef.current?.connected) {
      clientRef.current.publish({
        destination: "/app/send",
        body: input,
      });
      setInput("");
    }
  };

  return (
    <div>
      <h2>WebSocket Chat</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type message"
      />
      <button onClick={sendMessage}>Send</button>

      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}