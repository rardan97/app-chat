import ChatWindow from "@/components/ChatWindow"
import Sidebar from "@/components/Sidebar"
import { useAuth } from "@/context/AuthContext";
import { useWebSocket, type ChatMessageData } from "@/hooks/useWebSocket";
import type { MemberUserRoom } from "@/interface/MemberUser.interface"
import { useCallback, useState } from "react"

function ChatPage() {
    const { token, user } = useAuth();
    const [selectedUser, setSelectedUser] = useState<MemberUserRoom | null>(null);
    const [messagesByUser, setMessagesByUser] = useState<Record<string, ChatMessageData[]>>({});

    const myUsername = user?.username ?? "";

    const handleIncomingMessage = useCallback((msg: ChatMessageData) => {
        setMessagesByUser((prev) => {
            const prevMessages = prev[msg.userSender] || [];
            return {
                ...prev,
                [msg.userSender]: [...prevMessages, msg],
            };
        });
    }, []);


    const { sendMessage, isConnected } = useWebSocket(myUsername, token!, handleIncomingMessage);
    
    const handleSendMessage = (text: string) => {
        if (!selectedUser) {
            console.warn("User not selected");
            return;
        }
        if (!isConnected) {
            console.warn("WebSocket not connectedxx");
            return;
        }

        const msg: ChatMessageData = {
            userSender: myUsername,
            userRecipient: selectedUser.username,
            message: text,
            time: new Date().toISOString(),
        };

        setMessagesByUser((prev) => {
            const prevMessages = prev[selectedUser.username] || [];
            return {...prev,[selectedUser.username]: [...prevMessages, msg]};
        });

        sendMessage(msg);
    };

     if (!token || !user) {
        return <div>Unauthorized</div>;
    }

    return (
        <> 
            <Sidebar onSelectUser={setSelectedUser} />
            {selectedUser ? (
                <ChatWindow
                    user={selectedUser}
                    myUserId={myUsername}
                    messages={messagesByUser[selectedUser.username] || []}
                    onSendMessage={handleSendMessage}
                />
            ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400">
                Pilih teman untuk mulai chat
                </div>
            )}
        </>
    )
}

export default ChatPage
