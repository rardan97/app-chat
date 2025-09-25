package com.blackcode.app_chat_be.dto.memberroom;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MemberRoomRes {

    private Long userId;

    private String displayName;

    private String email;

    private String username;

    private String status;

}