import axios from "axios";
import { REST_API_BASE_MEMBER_URL } from "@/config";
import type { InviteMemberUserReq, InviteMemberUserRes, MemberInviteUserRoom, MemberInviteUserRoomReq, MemberUserRoom, NonMemberUser } from "@/interface/MemberUser.interface";

export const api = axios.create({
    baseURL: REST_API_BASE_MEMBER_URL,
    withCredentials: true
});

export async function getListNonMemberUsers(token: string) : Promise<NonMemberUser[]>{
    console.log("Data Token : "+token);
    try{
        const response = await api.get<NonMemberUser[]>(`${REST_API_BASE_MEMBER_URL}/member-rooms/getListNonMemberUser`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }catch(error){
        console.error("Error during user fetch:", error);
        throw new Error("Failed to fetch users");
    }
}

export async function addInviteMemberUsers(token: string, dataReq: InviteMemberUserReq) : Promise<InviteMemberUserRes>{
    console.log("user ID :");
    try{
        const response = await api.post<InviteMemberUserRes>(`${REST_API_BASE_MEMBER_URL}/member-rooms/addInviteMemberUser`, dataReq, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }catch(error){
        console.error("Error during user fetch:", error);
        throw new Error("Failed to fetch users");
    }
}

export async function getListMemberInviteUserRoom(token: string) : Promise<MemberInviteUserRoom[]>{
    console.log("Data Token : "+token);
    try{
        const response = await api.get<MemberInviteUserRoom[]>(`${REST_API_BASE_MEMBER_URL}/member-rooms/getListMemberInviteUserRoom`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }catch(error){
        console.error("Error during user fetch:", error);
        throw new Error("Failed to fetch users");
    }
}

export async function processInviteMemberUserRoom(token: string, dataReq: MemberInviteUserRoomReq) : Promise<InviteMemberUserRes>{
    try{
        const response = await api.post<InviteMemberUserRes>(`${REST_API_BASE_MEMBER_URL}/member-rooms/processInviteMemberUserRoom`, dataReq, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }catch(error){
        console.error("Error during user fetch:", error);
        throw new Error("Failed to fetch users");
    }
}

export async function getListMemberUserRoom(token: string) : Promise<MemberUserRoom[]>{
    console.log("Data Token : "+token);
    try{
        const response = await api.get<MemberUserRoom[]>(`${REST_API_BASE_MEMBER_URL}/member-rooms/getListMemberUserRoom`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }catch(error){
        console.error("Error during user fetch:", error);
        throw new Error("Failed to fetch users");
    }
}