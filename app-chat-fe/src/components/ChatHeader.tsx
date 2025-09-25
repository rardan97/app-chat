import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MemberUserRoom } from "@/interface/MemberUser.interface";

interface ChatHeaderProps {
    user: MemberUserRoom;
}

export default function ChatHeader({user}: ChatHeaderProps) {
    return (
        <div className=" bg-[#010425] px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#2563EB] flex items-center justify-center text-white font-semibold text-lg">J</div>
                <div>
                    <p className="font-semibold text-[#CBD5E1] leading-tight">
                        {user.displayName}
                    </p>
                    <p className="text-sm text-[#94A3B8]">online</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                {[MoreVertical].map((Icon, idx) => (
                <Button
                    key={idx}
                    variant="ghost"
                    size="icon"
                    className="hover:bg-[#1E40AF] transition-colors w-12 h-12 rounded-full"
                >
                    <Icon className="w-5 h-5 text-[#CBD5E1]" />
                </Button>
                ))}
            </div>
        </div>
    );
}