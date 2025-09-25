export interface SignUpReq {
    displayName: string;
    username: string;
    password: string;
    email: string;
}

export interface SignUpRes {
    token: string;
    refreshToken: string;
    username: string;
}