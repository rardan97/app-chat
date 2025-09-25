
import { REST_API_BASE_URL_AUTH } from "@/config";
import type { SignUpReq, SignUpRes } from "@/interface/SignUp.interface";

import axios from "axios";

export const api = axios.create({
    baseURL: REST_API_BASE_URL_AUTH,
    withCredentials: true
});

export async function signUpAuth(data: SignUpReq): Promise<{ data: SignUpRes | null }> {
    console.log("data :"+data);
    try{
        const response = await axios.post<SignUpRes>(`${REST_API_BASE_URL_AUTH}/signup`, data);
        console.log(response);
        return { data: response.data };
    }catch (error){
        console.error("Login failed:", error);
        return { data: null };
    }
}
