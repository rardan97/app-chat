export interface InviteMemberUserReq {
    userInviteId: number; 
}

export interface InviteMemberUserRes {
    message: string;
}

export interface proccessInviteMemberUsers {
    userId: number;
}

export interface NonMemberUser{
    userId: number;
    displayName: string;
    email: string;
    username: string;
    status: string;
}


export interface MemberInviteUserRoom{
    userId: number;
    displayName: string;
    email: string;
    username: string;
    chatGroupId: number;
}

export interface MemberInviteUserRoomReq{
    userInviteId: number;
    chatGroupId: number;
}

export interface MemberUserRoom{
    userId: number;
    displayName: string;
    email: string;
    username: string;
    status: string;
}