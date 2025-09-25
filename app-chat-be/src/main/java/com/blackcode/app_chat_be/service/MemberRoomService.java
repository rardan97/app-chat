package com.blackcode.app_chat_be.service;

import com.blackcode.app_chat_be.dto.invite.MemberInviteRes;
import com.blackcode.app_chat_be.dto.invite.ProcessInviteReq;
import com.blackcode.app_chat_be.dto.memberroom.MemberRoomRes;
import com.blackcode.app_chat_be.dto.invite.InviteReq;
import com.blackcode.app_chat_be.dto.nonmemberroom.NonMemberRoomRes;
import com.blackcode.app_chat_be.dto.userprofile.UserProfileRes;

import java.util.List;

public interface MemberRoomService {

    List<MemberRoomRes> getListMemberUserRoom(String username);

    List<NonMemberRoomRes> getListNonMemberUser(String username);

    void addMemberUser(InviteReq inviteReq, String username);

    List<MemberInviteRes> getListMemberInviteUserRoom(String username);

    void processInviteMemberUserRoom(ProcessInviteReq processInviteReq, String username);
}