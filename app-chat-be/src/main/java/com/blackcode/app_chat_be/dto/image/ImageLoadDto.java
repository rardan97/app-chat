package com.blackcode.app_chat_be.dto.image;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpHeaders;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ImageLoadDto {
    private byte[] image;
    private HttpHeaders headers;
}
