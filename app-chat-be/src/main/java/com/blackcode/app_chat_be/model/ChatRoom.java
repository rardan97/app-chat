package com.blackcode.app_chat_be.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tb_chat_room")
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatRoomId;

    private Timestamp created_at;

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL)
    private List<MemberRoom> chatRoomMembers;

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL)
    private List<MessageChat> messageChats;
}
