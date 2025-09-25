import { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { getListMemberUserRoom } from "@/api/MemberUserApi";
import type { MemberUserRoom } from "@/interface/MemberUser.interface";

export default function MemberList() {

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
            hasFetched.current = true;
        }
    }, [getListUser]);

    // const handleInvite = async  (userInviteId: number) => {
    //     const token = localStorage.getItem("accessToken");
    //     console.log(token);
    //     if (!token){
    //         return;
    //     }

    //     try {
    //         const newInvite: InviteMemberUserReq = {
    //             userInviteId
    //         }
    //         const response = addInviteMemberUsers(token, newInvite);
    //         console.log(response);
    //         console.log("Success processing data");
    //     } catch (error) {
    //         console.log("Failed processing data", error);
    //         throw error;
    //     }

    //     console.log("Invite send to user ID : ", userInviteId);
    // }
  
    return (
        <>
        
            <div className="container mx-auto p-3 border-t border-white/10">
                <div className="px-6 py-4">
                   <h2 className="text-2xl font-medium tracking-wide mb-2 text-white">
                    Your Connections
                    </h2>
                    <p className="text-sm text-slate-400 mb-4">
                    You’re already connected with these members.
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-4 lg:grid-cols-4">

                    {users
                        .filter((user) => user.userId !== null && user.userId !== undefined)
                        .filter((user) => user.status !== "pending")
                        .map((user) => (
                        <Card  key={user.userId} className="rounded-3xl overflow-hidden shadow-xl bg-[#030833]  max-w-sm mx-auto p-0">
                            {/* Header image */}
                            <div className="relative">
                                <div
                                    className="h-40 w-full bg-cover bg-center"
                                    style={{
                                        backgroundImage: "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80')"
                                    }}
                                />

                                {/* Avatar */}
                                <div className="absolute inset-x-0 -bottom-14 flex justify-center z-10">
                                    <img
                                        src="https://randomuser.me/api/portraits/women/44.jpg"
                                        alt="Profile"
                                        className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-md"
                                    />
                                </div>
                            </div>

                            {/* Main content */}
                            <div className="mt-16 text-center px-6 pb-6">
                                <h2 className="text-xl font-semibold text-white">{user.username}</h2>
                                <p className="text-sm text-white">Amsterdam, Netherlands</p>
                                <p className="mt-1 text-white font-medium">Copywriter</p>
                                <div className="flex justify-center gap-4 mt-4 px-6">
                            <button
                                className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-blue-700 transition duration-200"
                                onClick={() => alert("Invite friends clicked")}
                            >
                                Invite Friends
                            </button>
                            <button
                                className="bg-gray-200 text-gray-800 text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-300 transition duration-200"
                                onClick={() => alert("View profile clicked")}
                            >
                                View Profile
                            </button>
                            </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    )
}