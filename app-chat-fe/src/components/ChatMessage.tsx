import { Check } from "lucide-react";

interface ChatMessageProps {
    message: string;
    from: "me" | "them";
    time?: string;
    status?: "sent" | "read";
}

export default function ChatMessage({ message, from, time, status }: ChatMessageProps) {
    const isMe = from === "me";

    return (
        <div className={`flex items-end space-x-3 ${isMe ? "justify-end" : "justify-start"}`}>
            <div className="max-w-[70%] flex flex-col">
                <div className=
                    {`px-5 py-3 rounded-2xl shadow-sm text-sm leading-snug break-words ${isMe
                        ? "bg-gradient-to-br from-blue-700 to-blue-900 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                    style={{ boxShadow: isMe ? "0 2px 8px rgba(0, 75, 255, 0.4)" : undefined }}
                >
                {message}
                </div>
                <div className={`flex items-center space-x-2 mt-1 text-xs ${
                        isMe ? "justify-end text-gray-400" : "justify-start text-gray-500"
                    }`}
                >
                <span>{time || "12:00"}</span>

                {isMe && status && (
                    <span className="flex items-center relative w-6 h-4">
                        {status === "sent" && (
                            <Check className="w-4 h-4 text-gray-400" />
                        )}
                        {status === "read" && (
                            <>
                            <Check
                                className="w-4 h-4 text-blue-400 absolute left-0 top-0"
                                style={{ filter: "drop-shadow(0 0 1px rgba(0,0,0,0.15))" }}
                            />
                            <Check
                                className="w-4 h-4 text-blue-600 absolute left-3 top-0"
                                style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.25))" }}
                            />
                            </>
                        )}
                    </span>
                )}
                </div>
            </div>
        </div>
    );
}