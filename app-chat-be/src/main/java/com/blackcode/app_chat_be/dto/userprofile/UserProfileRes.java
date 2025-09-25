package com.blackcode.app_chat_be.dto.userprofile;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserProfileRes {

    private Long userId;

    private String displayName;

    private String email;

    private String username;

    private String status;

    private String imageProfile;

    private String imageBackground;

    private String address;

    private String jobTitle;

    private String bio;

}
