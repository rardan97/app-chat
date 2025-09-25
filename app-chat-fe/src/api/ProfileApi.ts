import { REST_API_BASE_USER_URL } from "@/config";
import type { UpdateUserDto, User } from "@/interface/User.interface";

import axios from "axios";


export const api = axios.create({
    baseURL: REST_API_BASE_USER_URL,
    withCredentials: true
});

export async function getProfileById(token: string) : Promise<User>{
    try{
        const response = await api.get<User>(`${REST_API_BASE_USER_URL}/user-profile/getProfile`, {
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


export async function editUserProfile(token: string, data: UpdateUserDto) : Promise<User>{
    const userProfilePayLoad = {
        userId: data.userId,
        displayName: data.displayName,
        username: data.username,
        email: data.email,
        status: data.status,
        address: data.address,
        jobTitle: data.jobTitle,
        bio: data.bio
    }

    const formData = new FormData();
    formData.append("userProfile", new Blob([JSON.stringify(userProfilePayLoad)], {
        type: "application/json"
    }));

    if (data.imageProfile) {
      formData.append("userProfileImage", data.imageProfile);
    }

    if (data.imageBackground) {
      formData.append("userBackgroundImage", data.imageBackground);
    }

    try{
        const response = await api.put<User>(`${REST_API_BASE_USER_URL}/user-profile/updateProfile`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }, 
        });
        return response.data;
    }catch(error){
        console.error("Error during user fetch:", error);
        throw new Error("Failed to fetch users");
    }
}


export async function getLoadImage(token: string, filename : File | string, type : string) : Promise<Blob>{
    try{
        const response = await api.get<Blob>(`${REST_API_BASE_USER_URL}/user-profile/images/${filename}/${type}`, {
            responseType:'blob',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }catch(error){
        console.error("Error during user fetch:", error);
        throw new Error("Failed to fetch users");
    }
}