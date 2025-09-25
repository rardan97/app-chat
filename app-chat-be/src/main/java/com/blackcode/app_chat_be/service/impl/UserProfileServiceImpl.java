package com.blackcode.app_chat_be.service.impl;

import com.blackcode.app_chat_be.dto.image.ImageDto;
import com.blackcode.app_chat_be.dto.image.ImageLoadDto;
import com.blackcode.app_chat_be.dto.userprofile.UserProfileReq;
import com.blackcode.app_chat_be.dto.userprofile.UserProfileRes;
import com.blackcode.app_chat_be.model.Users;
import com.blackcode.app_chat_be.repository.UserRepository;
import com.blackcode.app_chat_be.service.FileStorageService;
import com.blackcode.app_chat_be.service.UserProfileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Optional;

@Service
public class UserProfileServiceImpl implements UserProfileService {

    @Value("${uploadProfile.dir}")
    private String uploadProfileDir;

    @Value("${uploadBackground.dir}")
    private String uploadBackgroundDir;

    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    public UserProfileServiceImpl(UserRepository userRepository, FileStorageService fileStorageService) {
        this.userRepository = userRepository;
        this.fileStorageService = fileStorageService;
    }


    @Override
    public UserProfileRes getProfile(String username) {
        Optional<Users> user = userRepository.findByUsername(username);
        Users userResult = user.get();
        UserProfileRes userProfileRes = new UserProfileRes();
        userProfileRes.setUserId(userResult.getUserId());
        userProfileRes.setDisplayName(userResult.getDisplayName());
        userProfileRes.setEmail(userResult.getEmail());
        userProfileRes.setUsername(userResult.getUsername());
        return userProfileRes;
    }

    @Override
    public void updateProfile(String username, UserProfileReq userProfileReq, MultipartFile userProfileImage, MultipartFile userBackgroundImage) {

        Optional<Users> users = userRepository.findByUsername(username);
        if(users.isPresent()){
            Users usersData = users.get();
            usersData.setDisplayName(userProfileReq.getDisplayName());
            usersData.setEmail(userProfileReq.getEmail());
            usersData.setUsername(userProfileReq.getUsername());

            if (userProfileImage != null && !userProfileImage.isEmpty()) {
                String type = "profileImage";
                if(usersData.getImageProfile() != null && !usersData.getImageProfile().isEmpty()){
                    String filename = usersData.getImageProfile();
                    ImageDto processImageRtn = processImage(filename, userProfileImage, type);
                    if(processImageRtn.getImageStatus() && processImageRtn.getImagePath() != null){
                        String imagePath = storageImage(userProfileImage, type);
                        usersData.setImageProfile(imagePath);
                    }
                }else{
                    String imagePath = storageImage(userProfileImage, type);
                    usersData.setImageProfile(imagePath);
                }
            }

            if (userBackgroundImage != null && !userBackgroundImage.isEmpty()) {
                String type = "backgroundImage";
                if(usersData.getImageBackground() != null && !usersData.getImageBackground().isEmpty()){
                    String filename = usersData.getImageBackground();
                    ImageDto processImageRtn = processImage(filename, userBackgroundImage, type);
                    if(processImageRtn.getImageStatus() && processImageRtn.getImagePath() != null){
                        String imagePath = storageImage(userBackgroundImage, type);
                        usersData.setImageBackground(imagePath);
                    }
                }else{
                    String imagePath = storageImage(userBackgroundImage, type);
                    usersData.setImageBackground(imagePath);
                }
            }

            usersData.setAddress(userProfileReq.getAddress());
            usersData.setJobTitle(userProfileReq.getJobTitle());
            usersData.setBio(userProfileReq.getBio());
            userRepository.save(usersData);

            System.out.println("Success Update Profile User");
        }
    }

    @Override
    public ImageLoadDto getImage(String filename, String type) {
        ImageLoadDto imageLoadRtn = new ImageLoadDto();
        byte[] image = fileStorageService.load(filename, type);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        imageLoadRtn.setImage(image);
        imageLoadRtn.setHeaders(headers);
        return imageLoadRtn;
    }

    private ImageDto processImage(String filename, MultipartFile image, String type){
        if(filename.equals(image.getOriginalFilename())){
            System.out.println("image user user not change");
            ImageDto imageRtn = new ImageDto();
            imageRtn.setImageStatus(false);
            imageRtn.setImageMessage("image user not change");
            imageRtn.setImagePath(null);
            return imageRtn;
        }else{
            ImageDto imageRtn = new ImageDto();
            imageRtn = new ImageDto();
            String uploadDir = "";
            if("profileImage".equals(type)){
                uploadDir = uploadProfileDir;
            }else if("backgroundImage".equals(type)){
                uploadDir = uploadBackgroundDir;
            }
            File file = new File(uploadDir + File.separator + filename);
            if (file.exists()) {
                deleteImage(filename, type);
            } else {
                System.out.println("Image not found in Storage");
            }

            String imagePath = storageImage(image, type);
            imageRtn.setImageStatus(true);
            imageRtn.setImageMessage("image user not change");
            imageRtn.setImagePath(imagePath);
            return imageRtn;
        }
    }

    private String storageImage(MultipartFile image, String type){
        return fileStorageService.store(image, type);
    }

    private void deleteImage(String image, String type){
        fileStorageService.delete(image, type);
    }

}