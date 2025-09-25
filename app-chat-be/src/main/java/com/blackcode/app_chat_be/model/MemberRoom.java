package com.blackcode.app_chat_be.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tb_chat_room_members")
public class MemberRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatRoomMembersId;

    //status 1001 => menunggu konfirmasi pertemanan |
    //status 1002 => konfirmasi di tolak (pengirim dan penerima) |
    //status 1003 => konfirmasi di terima (pengirim dan penerima)
    private String status;

    //statusUserRoom => A001 (pengirim pertemanan)
    //statusUserRoom => A002 (penerima pertemanan)
    private String statusUserRoom;

    @ManyToOne
    @JoinColumn(name = "chatRoom_id", referencedColumnName = "chatRoomId")
    private ChatRoom chatRoom;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private Users user;

    private Timestamp joined_at;

}
