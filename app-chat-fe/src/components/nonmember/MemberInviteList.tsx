

import { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { getListMemberInviteUserRoom, processInviteMemberUserRoom } from "@/api/MemberUserApi";
import type { MemberInviteUserRoom, MemberInviteUserRoomReq } from "@/interface/MemberUser.interface";

export default function MemberInviteList() {

    const hasFetched = useRef(false);
    const [users, setUsers] = useState<MemberInviteUserRoom[]>([]);

    const getListUser = useCallback(async (): Promise<void> => {
        const token = localStorage.getItem("accessToken");
        console.log(token);
        if (!token){
            return;
        }
        try {
            const response = await getListMemberInviteUserRoom(token);
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

    const handleInvite = async  (userInviteId: number, chatGroupId: number) => {
        const token = localStorage.getItem("accessToken");
        console.log(token);
        if (!token){
            return;
        }

        try {
            const newInvitePrivate: MemberInviteUserRoomReq = {
                userInviteId,
                chatGroupId
            }
            const response = processInviteMemberUserRoom(token, newInvitePrivate);
            console.log(response);
            console.log("Success processing data");
        } catch (error) {
            console.log("Failed processing data", error);
            throw error;
        }

        console.log("Invite send to user ID : ", userInviteId);
    }
  
    return (
        <>

       
                
            <div className="container mx-auto p-3">
                <div className="px-6 py-4">
                    <h2 className="text-2xl font-medium tracking-wide mb-2 text-white">
                        Invite Members
                    </h2>
                    <p className="text-sm text-slate-400 mb-4">
                        Add users to this workspace or team.
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-4 lg:grid-cols-4">
                {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"> */}
                    {users
                    .filter((user) => user.userId !== null && user.userId !== undefined)
                    .map((user) => (
                        <Card
                            key={user.userId}
                            className="shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                        >
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold">
                                    {user.displayName || "No Name"}
                                </CardTitle>
                                <CardDescription className="text-gray-500">
                                    @{user.username || "username"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-2">
                                    <span className="font-semibold">Email:</span> {user.email || "-"}
                                </p>
                                <p className="mb-2">
                                    <span className="font-semibold">User ID:</span> {user.userId}
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <CardAction>
                                    <button
                                        className={`px-4 py-2 rounded transition text-white bg-blue-600 hover:bg-blue-700"
                                        }`}
                                        onClick={() => handleInvite(user.userId, user.chatGroupId)}   
                                    >
                                        approve
                                    </button>
                                    <button
                                        className={`px-4 py-2 rounded transition text-white bg-red-400 cursor-not-allowed" 
                                        }`}
                                        // onClick={() => handleInvite(user.userId)}
                                    >
                                        close
                                    </button>
                                </CardAction>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    )
}