package com.blackcode.app_chat_be.repository;

import com.blackcode.app_chat_be.model.MemberRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRoomRepository extends JpaRepository<MemberRoom, Long> {

    @Query("SELECT m FROM MemberRoom m WHERE m.chatRoom.chatRoomId = :chatRoomId AND m.user.username <> :username")
    Optional<MemberRoom> findByChatRoomIdAndUsernameDiff(@Param("chatRoomId") Long chatRoomId, @Param("username") String username);

    @Query("SELECT m FROM MemberRoom m WHERE m.chatRoom.chatRoomId = :chatRoomId AND m.user.userId = :userId")
    Optional<MemberRoom> findByChatRoomIdAndUserId(@Param("chatRoomId") Long chatRoomId, @Param("userId") Long userId);

    @Query("SELECT m FROM MemberRoom m WHERE m.chatRoom.chatRoomId = :chatRoomId AND m.user.username = :username")
    Optional<MemberRoom> findByChatRoomIdAndUsername(@Param("chatRoomId") Long chatRoomId, @Param("username") String username);

    @Query("SELECT m FROM MemberRoom m WHERE m.user.username = :username AND m.statusUserRoom = :statusUserRoom")
    List<MemberRoom> findByUsernameAndStatusUserRoom(@Param("username") String username, @Param("statusUserRoom") String statusUserRoom);


    @Query("SELECT m FROM MemberRoom m WHERE m.user.username = :username")
    List<MemberRoom> findAllByUsername(@Param("username") String username);

    @Query("SELECT m FROM MemberRoom m WHERE m.chatRoom.chatRoomId = :chatRoomId")
    List<MemberRoom> findAllByChatRoomId(@Param("chatRoomId") Long chatRoomId);








}
