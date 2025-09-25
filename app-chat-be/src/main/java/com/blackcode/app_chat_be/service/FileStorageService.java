package com.blackcode.app_chat_be.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    String store(MultipartFile file, String typeImage);
    byte[] load(String filename, String typeImage);
    void delete(String filename, String typeImage);
}
