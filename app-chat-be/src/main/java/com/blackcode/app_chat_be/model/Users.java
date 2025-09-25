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
@Table(name = "tb_user")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String displayName;

    private String email;

    private String username;

    private String password;

    private String status;

    private String imageProfile;

    private String imageBackground;

    private String address;

    private String jobTitle;

    private String bio;

    private Timestamp created_at;

    private Timestamp updated_at;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<MemberRoom> chatRoomMembers;

    @OneToMany(mappedBy = "userSender", cascade = CascadeType.ALL)
    private List<MessageChat> messageChats;

    public Users(String displayName, String email, String username, String password) {
        this.displayName = displayName;
        this.email = email;
        this.username = username;
        this.password = password;
    }

}
