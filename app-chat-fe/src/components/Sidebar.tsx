import { useCallback, useEffect, useRef, useState } from "react";
import SidebarHeader from "./SidebarHeader";
import type { MemberUserRoom } from "@/interface/MemberUser.interface";
import { getListMemberUserRoom } from "@/api/MemberUserApi";


interface SidebarProps {
    onSelectUser: (user: MemberUserRoom) => void;
}


export default function Sidebar({ onSelectUser }: SidebarProps) {

    

    const hasFetched = useRef(false);
    const [users, setUsers] = useState<MemberUserRoom[]>([]);

    const getListUser = useCallback(async (): Promise<void> => {
        const token = localStorage.getItem("accessToken");
        console.log(token);
        if (!token){
            return;
        }
        try {
            const response = await getListMemberUserRoom(token);
            console.log("Success processing data");
            setUsers(response);
        } catch (error) {
            console.log("Failed processing data", error);
            throw error;
        }
    }, []);

    useEffect(() => {
        console.log(hasFetched);
        if (!hasFetched.current) {
            getListUser();
            hasFetched.current = true; // Cegah request kedua
        }
    }, [getListUser]);


return (
    <aside
    className="
        w-[300px] h-screen py-5 flex flex-col border-r border-[#01063a] bg-[#010425] text-[#CBD5E1]
        shadow-lg px-2
    "
    >
        <SidebarHeader />

        
        <div className="flex-1 space-y-4 mt-0">
            {users
            .filter((user) => user.userId !== null && user.userId !== undefined)
            .map((user) => (
                <div  
                    key={user.userId}
                    onClick={() => onSelectUser(user)}
                    className="flex items-center gap-3 cursor-pointer rounded-md p-4
                        hover:bg-[#1E40AF]/90
                        hover:text-[#E0E7FF]
                        transition duration-300 ease-in-out
                        transform hover:scale-[1.03]">
                    <div className="w-10 h-10 bg-[#2563EB] rounded-full flex items-center justify-center text-white font-semibold select-none">
                        {user.displayName?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div className="overflow-hidden">
                        <p className="font-semibold truncate max-w-[180px]">
                        {user.displayName} 
                        </p>
                        <p className="text-sm text-[#94A3B8] truncate max-w-[180px]">
                        Last message preview here...
                        </p>
                    </div>
                
                </div>
            ))}
        </div>
    </aside>
);
}