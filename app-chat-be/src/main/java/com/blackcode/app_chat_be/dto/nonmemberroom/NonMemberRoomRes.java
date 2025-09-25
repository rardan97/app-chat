package com.blackcode.app_chat_be.dto.nonmemberroom;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class NonMemberRoomRes {

    private Long userId;

    private String displayName;

    private String email;

    private String username;

    private String status;

}
