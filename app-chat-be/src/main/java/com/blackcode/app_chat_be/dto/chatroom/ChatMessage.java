package com.blackcode.app_chat_be.dto.chatroom;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage {
    private String userSender;
    private String userRecipient;
    private String message;
    private String time;
}
