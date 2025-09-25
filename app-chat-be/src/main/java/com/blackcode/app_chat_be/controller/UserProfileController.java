package com.blackcode.app_chat_be.controller;

import com.blackcode.app_chat_be.dto.image.ImageLoadDto;
import com.blackcode.app_chat_be.dto.userprofile.UserProfileReq;
import com.blackcode.app_chat_be.dto.userprofile.UserProfileRes;
import com.blackcode.app_chat_be.service.UserProfileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/user/user-profile")
public class UserProfileController {

    private final UserProfileService userProfileService;

    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @GetMapping("/getProfile")
    public ResponseEntity<UserProfileRes> getProfile(){
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            UserProfileRes userProfileRes = userProfileService.getProfile(username);
            return ResponseEntity.ok(userProfileRes);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/updateProfile")
    public ResponseEntity<String> updateProduct(
            @RequestPart("userProfile") UserProfileReq userProfileReqParam,
            @RequestPart(value = "userProfileImage", required = false) MultipartFile userProfileImage,
            @RequestPart(value = "userBackgroundImage", required = false) MultipartFile userBackgroundImage){

        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            userProfileService.updateProfile(username, userProfileReqParam, userProfileImage, userBackgroundImage);
            return ResponseEntity.ok("Update profile");
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/images/{type}/{filename}")
    public ResponseEntity<byte[]> getImage(@PathVariable String type, @PathVariable String filename) {
        try {
            ImageLoadDto imageLoadDto = new ImageLoadDto();
            imageLoadDto = userProfileService.getImage(filename, type);
            return new ResponseEntity<>(imageLoadDto.getImage(), imageLoadDto.getHeaders(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}