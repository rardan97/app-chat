import { useEffect, useRef, useState } from "react";
import { Client, type IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export interface ChatMessageData {
    userSender: string;
    userRecipient: string;
    message: string;
    time: string;
}

const SOCKET_URL = "http://localhost:8080/ws";


export function useWebSocket(myUsername: string, jwtToken: string, onMessageReceived: (msg: ChatMessageData) => void) {
    const stompClient = useRef<Client | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!myUsername || !jwtToken) {
            console.warn("Missing userId or token, WebSocket will not connect");
            return;
        }

        console.log("token in websocket : "+jwtToken);
        const socket = new SockJS(SOCKET_URL);
        const client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        connectHeaders: {
            token: jwtToken,
        },
        onConnect: () => {
            console.log("WebSocket connected");
            setIsConnected(true);

            client.subscribe(`/user/queue/messages`, (message: IMessage) => {
            const chat: ChatMessageData = JSON.parse(message.body);
            onMessageReceived(chat);
            });
        },
        onDisconnect: () => {
            console.warn("WebSocket disconnected");
            setIsConnected(false);
        },
        onStompError: (frame) => {
            console.error("Broker reported error: " + frame.headers['message']);
            console.error("Details: " + frame.body);
        },
        onWebSocketError: (event) => {
            console.error("WebSocket error:", event);
        },
        onWebSocketClose: (event) => {
            console.warn("WebSocket closed:", event);
        }
        });

        stompClient.current = client;
        client.activate();

        return () => {
        client.deactivate();
        };
    }, [myUsername, jwtToken, onMessageReceived]);

    const sendMessage = (chatMessage: ChatMessageData) => {
        console.log("userSender : "+chatMessage.userSender);
        console.log("userRecipient : "+chatMessage.userRecipient);
        console.log("message : "+chatMessage.message);
        if (stompClient.current && stompClient.current.connected) {
            stompClient.current.publish({
                destination: "/app/chat",
                body: JSON.stringify(chatMessage),
            });
        } else {
        console.warn("WebSocket not connected");
        }
    };

    return { sendMessage, isConnected };
}