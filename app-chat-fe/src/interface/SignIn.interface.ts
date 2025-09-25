export interface SignInReq {
    username: string;
    password: string;
}

export interface SignInRes {
    token: string;
    refreshToken: string;
    userId: number;
    username: string;
    type: string;
}