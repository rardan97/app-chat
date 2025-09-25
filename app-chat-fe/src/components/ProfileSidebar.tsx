// components/ProfileSidebar.tsx

import { User, UserPlus, MessageSquareText, Contact } from "lucide-react";

export default function ProfileSidebar() {
    return (
        <aside className="w-20 h-screen p-4 flex flex-col items-center border-l bg-blue-990 text-blue-300 space-y-6 justify-center">
            <a href="/">
                <button
                    className="flex flex-col items-center justify-center w-15 h-15 rounded-full hover:bg-blue-700 text-blue-300 hover:text-white transition-colors"
                    aria-label="Profile"
                >
                    <MessageSquareText className="w-6 h-6" />
                </button>
            </a>
            <a href="/profile">
                <button
                    className="flex flex-col items-center justify-center w-15 h-15 rounded-full hover:bg-blue-700 text-blue-300 hover:text-white transition-colors"
                    aria-label="Profile"
                >
                    <User className="w-6 h-6" />
                </button>
            </a>
            <a href="/member">
                <button
                    className="flex flex-col items-center justify-center w-15 h-15 rounded-full hover:bg-blue-700 text-blue-300 hover:text-white transition-colors"
                    aria-label="member"
                >
                    <Contact className="w-6 h-6" />
                </button>
            </a>
            <a href="/nonmember">
                <button
                    className="flex flex-col items-center justify-center w-15 h-15 rounded-full hover:bg-blue-700 text-blue-300 hover:text-white transition-colors"
                    aria-label="Profile"
                >
                    <UserPlus className="w-6 h-6" />
                </button>
            </a>
        </aside>
    );
}