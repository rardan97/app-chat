package com.blackcode.app_chat_be.service.impl;

import com.blackcode.app_chat_be.dto.invite.MemberInviteRes;
import com.blackcode.app_chat_be.dto.invite.ProcessInviteReq;
import com.blackcode.app_chat_be.dto.memberroom.MemberRoomRes;
import com.blackcode.app_chat_be.dto.invite.InviteReq;
import com.blackcode.app_chat_be.dto.nonmemberroom.NonMemberRoomRes;
import com.blackcode.app_chat_be.dto.userprofile.UserProfileRes;
import com.blackcode.app_chat_be.model.ChatRoom;
import com.blackcode.app_chat_be.model.MemberRoom;
import com.blackcode.app_chat_be.model.Users;
import com.blackcode.app_chat_be.repository.ChatRoomRepository;
import com.blackcode.app_chat_be.repository.MemberRoomRepository;
import com.blackcode.app_chat_be.repository.UserRepository;
import com.blackcode.app_chat_be.service.MemberRoomService;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MemberRoomServiceImpl implements MemberRoomService {

    private final UserRepository userRepository;

    private final ChatRoomRepository chatRoomRepository;

    private final MemberRoomRepository memberRoomRepository;

    public MemberRoomServiceImpl(UserRepository userRepository, ChatRoomRepository chatRoomRepository, MemberRoomRepository memberRoomRepository) {
        this.userRepository = userRepository;
        this.chatRoomRepository = chatRoomRepository;
        this.memberRoomRepository = memberRoomRepository;
    }


    @Override
    public List<MemberRoomRes> getListMemberUserRoom(String username) {
        List<MemberRoomRes> memberRoomResList = new ArrayList<>();
        List<MemberRoom> memberRoomUser = memberRoomRepository.findAllByUsername(username);
        List<MemberRoom> memberRoomList = new ArrayList<>();
        for (MemberRoom memberRoomRow : memberRoomUser){
            System.out.println("check chatroom : "+memberRoomRow.getChatRoom().getChatRoomId());
            System.out.println("check userId : "+memberRoomRow.getUser().getUserId());
            if(memberRoomRow.getStatus().equals("1003")){
               List<MemberRoom> memberRoomData = memberRoomRepository.findAllByChatRoomId(memberRoomRow.getChatRoom().getChatRoomId());
               memberRoomList.addAll(memberRoomData);
            }
        }

        if (!memberRoomList.isEmpty()) {
            System.out.println("Size :"+memberRoomList.size());
            for (MemberRoom memberRoom : memberRoomList) {
                System.out.println("check user Id"+memberRoom.getUser().getUserId());
                if(memberRoom.getUser().getUsername().equals(username)){
                    continue;
                }
                Users users = memberRoom.getUser();
                MemberRoomRes memberRoomRes = new MemberRoomRes();
                memberRoomRes.setUserId(users.getUserId());
                memberRoomRes.setDisplayName(users.getDisplayName());
                memberRoomRes.setEmail(users.getEmail());
                memberRoomRes.setUsername(users.getUsername());
                memberRoomRes.setStatus(users.getStatus());
                memberRoomResList.add(memberRoomRes);
            }
        }


        return memberRoomResList;
    }

    @Override
    public List<NonMemberRoomRes> getListNonMemberUser(String username) {
        List<NonMemberRoomRes> nonMemberRoomList = new ArrayList<>();
        List<MemberRoom> memberRoomList = new ArrayList<>();
        List<MemberRoom> memberRoomUser = memberRoomRepository.findAllByUsername(username);
        for (MemberRoom memberRoom : memberRoomUser){
            Optional<MemberRoom> memberRoom1 = memberRoomRepository.findByChatRoomIdAndUserId(memberRoom.getChatRoom().getChatRoomId(), memberRoom.getUser().getUserId());
            MemberRoom memberRoomTemp = getMemberRoom(memberRoom1);
            memberRoomList.add(memberRoomTemp);
        }

        List<ChatRoom> chatRooms = new ArrayList<>();
        if(!memberRoomList.isEmpty()){
            for (MemberRoom memberRoomRow : memberRoomList){
                System.out.println("Check getUserId 1:"+memberRoomRow.getUser().getUserId());
                System.out.println("Check getChatRoomId 1:"+memberRoomRow.getChatRoom().getChatRoomId());
                System.out.println("Check StatusUserRoom 1:"+memberRoomRow.getStatusUserRoom());
                chatRooms.add(memberRoomRow.getChatRoom());
            }
        }
        System.out.println("===========================================");
        List<MemberRoom> memberRoomList1 = new ArrayList<>();
        for (ChatRoom chatRoomRow : chatRooms){
            System.out.println("Check getChatRoomId 2:"+chatRoomRow.getChatRoomId());
            Optional<MemberRoom> memberRoom = memberRoomRepository.findByChatRoomIdAndUsernameDiff(
                    chatRoomRow.getChatRoomId(),
                    username
            );

            if(memberRoom.isPresent()){
                System.out.println("Check getUserId 2:"+memberRoom.get().getUser().getUserId());
                System.out.println("Check getStatus 2:"+memberRoom.get().getStatus());
                System.out.println("Check StatusUserRoom 2:"+memberRoom.get().getStatusUserRoom());
            }
            memberRoom.ifPresent(memberRoomList1::add);
        }

        Map<Long, MemberRoom> memberRoomMap = memberRoomList1.stream()
                .collect(Collectors.toMap(
                        mr -> mr.getUser().getUserId(),
                        mr -> mr
                ));

        System.out.println("===========================================");

        List<Users> usersList = userRepository.findAllExceptUsername(username);
        for (Users users : usersList){
            NonMemberRoomRes nonMemberRoomRes = null;
            if(memberRoomMap.containsKey(users.getUserId())){
                MemberRoom memberRoom = memberRoomMap.get(users.getUserId());
                System.out.println("Check getUserId 3:"+memberRoom.getUser().getUserId());
                System.out.println("Check getStatus 3:"+memberRoom.getStatus());
                System.out.println("Check StatusUserRoom 3:"+memberRoom.getStatusUserRoom());
                if(memberRoom.getStatus().equals("1003")){
                    System.out.println("Data User 1003 tidak di ambil");
                }else{
                    nonMemberRoomRes = new NonMemberRoomRes();
                    nonMemberRoomRes.setUserId(users.getUserId());
                    nonMemberRoomRes.setDisplayName(users.getDisplayName());
                    nonMemberRoomRes.setUsername(users.getUsername());
                    nonMemberRoomRes.setEmail(users.getEmail());
                    if(memberRoom.getStatusUserRoom().equals("A001")){
                        nonMemberRoomRes.setStatus("pending");
                    }else if(memberRoom.getStatusUserRoom().equals("A002")){
                        nonMemberRoomRes.setStatus("waiting");
                    }

                    nonMemberRoomList.add(nonMemberRoomRes);
                }
            }else{
                System.out.println("user tidak ada di room : "+users.getUserId());
                nonMemberRoomRes = new NonMemberRoomRes();
                nonMemberRoomRes.setUserId(users.getUserId());
                nonMemberRoomRes.setDisplayName(users.getDisplayName());
                nonMemberRoomRes.setUsername(users.getUsername());
                nonMemberRoomRes.setEmail(users.getEmail());
                nonMemberRoomRes.setStatus("nonmember");
                nonMemberRoomList.add(nonMemberRoomRes);
            }
        }
        return nonMemberRoomList;
    }

    private static MemberRoom getMemberRoom(Optional<MemberRoom> memberRoom1) {
        MemberRoom memberRoomTemp = new MemberRoom();
        memberRoomTemp.setUser(memberRoom1.get().getUser());
        memberRoomTemp.setChatRoom(memberRoom1.get().getChatRoom());
        memberRoomTemp.setStatus(memberRoom1.get().getStatus());
        memberRoomTemp.setChatRoomMembersId(memberRoom1.get().getChatRoomMembersId());
        memberRoomTemp.setJoined_at(memberRoom1.get().getJoined_at());
        memberRoomTemp.setStatusUserRoom(memberRoom1.get().getStatusUserRoom());
        return memberRoomTemp;
    }

    @Override
    public void addMemberUser(InviteReq inviteReq, String username) {

        Optional<Users> users = userRepository.findById(inviteReq.getUserInviteId());
        if(users.isEmpty()){
            return;
        }

        MemberRoom memberRoom1 = new MemberRoom();
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setCreated_at(new Timestamp(new Date().getTime()));
        ChatRoom chatRoomSave = chatRoomRepository.save(chatRoom);
        memberRoom1.setChatRoom(chatRoomSave);
        memberRoom1.setUser(users.get());
        memberRoom1.setStatus("1001");
        memberRoom1.setStatusUserRoom("A002");
        memberRoomRepository.save(memberRoom1);
        System.out.println("End proses Save User 1");

        Optional<Users> users1 = userRepository.findByUsername(username);
        if(users1.isEmpty()){
            return;
        }

        MemberRoom memberRoom2 = new MemberRoom();
        memberRoom2.setChatRoom(chatRoomSave);
        memberRoom2.setUser(users1.get());
        memberRoom2.setStatus("1001");
        memberRoom2.setStatusUserRoom("A001");
        memberRoomRepository.save(memberRoom2);
        System.out.println("End proses Save User 2");

    }

    @Override
    public List<MemberInviteRes> getListMemberInviteUserRoom(String username) {
        List<MemberInviteRes> memberInviteResList = new ArrayList<>();

        String statusUserRoom = "A002";
        List<MemberRoom> memberRoomList = memberRoomRepository.findByUsernameAndStatusUserRoom(username, statusUserRoom);

        List<ChatRoom> chatRooms = new ArrayList<>();
        if(!memberRoomList.isEmpty()){
            for (MemberRoom memberRoomRow : memberRoomList){
                System.out.println("Check Data userid 1:"+memberRoomRow.getUser().getUserId());
                System.out.println("Check Data chat room member 1:"+memberRoomRow.getChatRoom().getChatRoomId());
                chatRooms.add(memberRoomRow.getChatRoom());
            }
        }
        List<MemberRoom> memberRoomList1 = new ArrayList<>();
        for (ChatRoom chatRoomRow : chatRooms){
            System.out.println("Check Data chatroom:"+chatRoomRow.getChatRoomId());
            Optional<MemberRoom> memberRoom = memberRoomRepository.findByChatRoomIdAndUsernameDiff(
                    chatRoomRow.getChatRoomId(),
                    username
            );

            if(memberRoom.isPresent()){
                System.out.println("Check Data userid:"+memberRoom.get().getUser().getUserId());
                System.out.println("Check Data sttus:"+memberRoom.get().getStatus());
            }
            memberRoom.ifPresent(memberRoomList1::add);
        }

        for (MemberRoom memberRoomRow : memberRoomList1){

            Optional<Users> users = userRepository.findById(memberRoomRow.getUser().getUserId());
            if(users.isPresent()){
                if (!memberRoomRow.getStatus().equals("1003")){
                    MemberInviteRes memberInviteRes = new MemberInviteRes();
                    memberInviteRes.setUserId(users.get().getUserId());
                    memberInviteRes.setUsername(users.get().getUsername());
                    memberInviteRes.setEmail(users.get().getEmail());
                    memberInviteRes.setDisplayName(users.get().getDisplayName());
                    memberInviteRes.setChatGroupId(memberRoomRow.getChatRoom().getChatRoomId());
                    memberInviteResList.add(memberInviteRes);
                }

            }
        }
        return memberInviteResList;
    }

    @Override
    public void processInviteMemberUserRoom(ProcessInviteReq processInviteReq, String username) {
        System.out.println("group Id :"+processInviteReq.getChatGroupId());
        System.out.println("user Id :"+processInviteReq.getUserInviteId());
        System.out.println("Process Invite Member User");

        Optional<MemberRoom> memberRoomResult1 = memberRoomRepository.findByChatRoomIdAndUserId(processInviteReq.getChatGroupId(), processInviteReq.getUserInviteId());
        if(memberRoomResult1.isPresent()){
            MemberRoom memberRoom1 = memberRoomResult1.get();
            memberRoom1.setStatus("1003");
            memberRoomRepository.save(memberRoom1);
        }

        Optional<MemberRoom> memberRoomResult2 = memberRoomRepository.findByChatRoomIdAndUsername(processInviteReq.getChatGroupId(), username);
        if(memberRoomResult2.isPresent()){
            MemberRoom memberRoom2 = memberRoomResult2.get();
            memberRoom2.setStatus("1003");
            memberRoomRepository.save(memberRoom2);
        }

        System.out.println("Process Update selesai");

    }
}
