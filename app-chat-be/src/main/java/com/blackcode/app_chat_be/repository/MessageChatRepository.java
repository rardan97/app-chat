package com.blackcode.app_chat_be.repository;

import com.blackcode.app_chat_be.model.MessageChat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageChatRepository extends JpaRepository<MessageChat, Long> {
}
