export interface User {
    userId: number;
    displayName: string;
    username: string;
    email: string;
    status: string;
    imageProfile: string;
    imageBackground: string;
    address: string;
    jobTitle: string;
    bio: string;
}

export interface UpdateUserDto{
    userId: number;
    displayName: string;
    username: string;
    email: string;
    status: string;
    imageProfile: File | string;
    imageBackground: File | string;
    address: string;
    jobTitle: string;
    bio: string;
}
