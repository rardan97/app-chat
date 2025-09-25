package com.blackcode.app_chat_be.controller;

import com.blackcode.app_chat_be.dto.chatroom.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class ChatRoomController {

    private final SimpMessagingTemplate messagingTemplate;

    public ChatRoomController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat")
    public void handleChat(@Payload ChatMessage chatMessage, Principal principal){
        chatMessage.setUserSender(principal.getName());
        messagingTemplate.convertAndSendToUser(
                chatMessage.getUserRecipient(),
                "/queue/messages",
                chatMessage
        );
    }

}
