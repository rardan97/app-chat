import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import type { MemberUserRoom } from "@/interface/MemberUser.interface";
import type { ChatMessageData } from "@/hooks/useWebSocket";


interface ChatWindowProps {
    user: MemberUserRoom;
    myUserId: string;
    messages: ChatMessageData[];
    onSendMessage: (text: string) => void;
}

export default function ChatWindow({ user, myUserId, messages, onSendMessage }: ChatWindowProps) {
    return (
        <div className="flex-1 h-screen flex flex-col">
            <ChatHeader user={user} />
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1.5 m-5">
                {messages.map((msg, idx) => (
                    <ChatMessage
                        key={idx}
                        message={msg.message}
                        from={msg.userSender === myUserId ? "me" : "them"}
                        time={msg.time}
                    />
                ))}
            </div>
            <ChatInput onSendMessage={onSendMessage} />
        </div>
    );
}