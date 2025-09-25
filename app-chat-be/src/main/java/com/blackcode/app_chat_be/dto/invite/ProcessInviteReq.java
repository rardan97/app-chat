package com.blackcode.app_chat_be.dto.invite;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProcessInviteReq {

    private Long userInviteId;

    private Long chatGroupId;

}
