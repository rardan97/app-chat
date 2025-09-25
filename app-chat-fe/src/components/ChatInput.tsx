
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

interface ChatInputProps {
    onSendMessage: (text: string) => void;
}


export default function ChatInput({ onSendMessage }: ChatInputProps ) {
    const [text, setText] = useState("");

const handleSend = () => {
    if (text.trim() === "") return;
    onSendMessage(text.trim());
    setText("");
};

const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSend();
    }
};


return (
    <div className="flex items-center gap-3 p-6 bg-[#010425] rounded-t-xl shadow-lg">
        <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 bg-[#1E2A47] text-[#E0E7FF] placeholder:text-[#94A3B8] rounded-3xl py-5 px-5 focus:ring-2 focus:ring-[#3B82F6] focus:outline-none transition"
        />
        <Button
            onClick={handleSend}
            className="bg-[#3B82F6] hover:bg-[#2563EB] p-5 rounded-full shadow-md transition"
            aria-label="Send message"
        >
            <Send className="w-7 h-7 text-white" />
        </Button>
    </div>
);
}