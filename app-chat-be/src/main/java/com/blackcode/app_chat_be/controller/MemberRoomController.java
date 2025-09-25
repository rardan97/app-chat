package com.blackcode.app_chat_be.controller;

import com.blackcode.app_chat_be.dto.invite.MemberInviteRes;
import com.blackcode.app_chat_be.dto.invite.ProcessInviteReq;
import com.blackcode.app_chat_be.dto.memberroom.MemberRoomRes;
import com.blackcode.app_chat_be.dto.invite.InviteReq;
import com.blackcode.app_chat_be.dto.nonmemberroom.NonMemberRoomRes;
import com.blackcode.app_chat_be.service.MemberRoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/member/member-rooms")
public class MemberRoomController {

    private final MemberRoomService memberRoomService;

    public MemberRoomController(MemberRoomService memberRoomService) {
        this.memberRoomService = memberRoomService;
    }


    @GetMapping("/getListNonMemberUser")
    public ResponseEntity<List<NonMemberRoomRes>> getListNonMemberUser(){
        System.out.println("Proccess");
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("Username dari JWT token: " + username);
        List<NonMemberRoomRes> nonMemberRoomResList = memberRoomService.getListNonMemberUser(username);
        return ResponseEntity.ok(nonMemberRoomResList);
    }

    @PostMapping("/addInviteMemberUser")
    public ResponseEntity<String> addPrivateInviteContact(@RequestBody InviteReq userInviteReq){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        memberRoomService.addMemberUser(userInviteReq, username);
        return ResponseEntity.ok("success invite");
    }

    @GetMapping("/getListMemberInviteUserRoom")
    public ResponseEntity<List<MemberInviteRes>> getListMemberInviteUserRoom(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("Username dari JWT token: " + username);
        List<MemberInviteRes> userRes = memberRoomService.getListMemberInviteUserRoom(username);
        return ResponseEntity.ok(userRes);
    }


    @PostMapping("/processInviteMemberUserRoom")
    public ResponseEntity<String> processInviteMemberUserRoom(@RequestBody ProcessInviteReq processInviteReq){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        memberRoomService.processInviteMemberUserRoom(processInviteReq, username);
        return ResponseEntity.ok("success invite");
    }




    @GetMapping("/getListMemberUserRoom")
    public ResponseEntity<List<MemberRoomRes>> getListMemberUserRoom(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("Username dari JWT token: " + username);
        List<MemberRoomRes> userRes = memberRoomService.getListMemberUserRoom(username);
        return ResponseEntity.ok(userRes);
    }











//    @GetMapping("/getProfile/{username}")
//    public ResponseEntity<UserProfileRes> getProfile(@PathVariable("username") String username){
//        UserProfileRes userProfileRes = privateContactService.getProfile(username);
//        return ResponseEntity.ok(userProfileRes);
//    }


}
