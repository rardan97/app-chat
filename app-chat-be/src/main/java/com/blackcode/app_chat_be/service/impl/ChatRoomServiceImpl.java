package com.blackcode.app_chat_be.service.impl;

import com.blackcode.app_chat_be.model.ChatRoom;
import com.blackcode.app_chat_be.model.MemberRoom;
import com.blackcode.app_chat_be.model.Users;
import com.blackcode.app_chat_be.repository.MemberRoomRepository;
import com.blackcode.app_chat_be.repository.ChatRoomRepository;
import com.blackcode.app_chat_be.repository.UserRepository;
import com.blackcode.app_chat_be.service.ChatRoomService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.blackcode.app_chat_be.common.StatusConstants.STATUS_PENDING;
import static com.blackcode.app_chat_be.common.StatusUser.USER_RECEIVER;
import static com.blackcode.app_chat_be.common.StatusUser.USER_SENDER;

@Service
public class ChatRoomServiceImpl implements ChatRoomService {



    private final ChatRoomRepository chatRoomRepository;

    private final MemberRoomRepository chatRoomMembersRepository;

    private final UserRepository userRepository;

    public ChatRoomServiceImpl(ChatRoomRepository chatRoomRepository, MemberRoomRepository chatRoomMembersRepository, UserRepository userRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.chatRoomMembersRepository = chatRoomMembersRepository;
        this.userRepository = userRepository;
    }

//    @Override
//    public void addChatPrivateRoom(ChatRoomInviteReq chatRoomInviteReq) {
//
//        String username = SecurityContextHolder.getContext().getAuthentication().getName();
//        ChatRoom chatRoom = new ChatRoom();
//        chatRoom.setGroup(false);
//        ChatRoom chatRoom1 = chatRoomRepository.save(chatRoom);
//        Optional<Users> userReceiver = userRepository.findById(chatRoomInviteReq.getUserInviteId());
//        MemberRoom chatRoomMembers = new MemberRoom();
//        chatRoomMembers.setStatusAccept(STATUS_PENDING);
//        chatRoomMembers.setStatusUser(USER_RECEIVER);
//        chatRoomMembers.setChatRoom(chatRoom1);
//        chatRoomMembers.setUser(userReceiver.get());
//        chatRoomMembersRepository.save(chatRoomMembers);
//
//        Optional<Users> userSender = userRepository.findByUsername(username);
//        MemberRoom chatRoomMembersSender = new MemberRoom();
//        chatRoomMembersSender.setStatusAccept(STATUS_PENDING);
//        chatRoomMembersSender.setStatusUser(USER_SENDER);
//        chatRoomMembersSender.setChatRoom(chatRoom1);
//        chatRoomMembersSender.setUser(userSender.get());
//        chatRoomMembersRepository.save(chatRoomMembersSender);
//
//        System.out.println("Invite Chat Room");
//    }

//    @Override
//    public void addChatPrivateRoom(ChatRoomInviteReq chatRoomInviteReq) {
//
//    }

    @Override
    public void addChatGroupRoom() {

    }
}
