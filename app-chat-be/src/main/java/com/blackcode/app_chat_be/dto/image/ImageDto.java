package com.blackcode.app_chat_be.dto.image;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ImageDto {

    private String imageMessage;
    private String imagePath;
    private Boolean imageStatus;

}
