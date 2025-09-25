package com.blackcode.app_chat_be.service;

import com.blackcode.app_chat_be.dto.image.ImageLoadDto;
import com.blackcode.app_chat_be.dto.userprofile.UserProfileReq;
import com.blackcode.app_chat_be.dto.userprofile.UserProfileRes;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface UserProfileService {

    UserProfileRes getProfile(String username);

    void updateProfile(String username, UserProfileReq userProfileReq,  MultipartFile userProfileImage, MultipartFile userBackgroundImage);

    ImageLoadDto getImage(String filename, String type);

}