package com.blackcode.app_chat_be.repository;

import com.blackcode.app_chat_be.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {

    Optional<Users> findByUsername(String username);

    Boolean existsByUsername(String username);

    @Query("SELECT u FROM Users u WHERE u.username <> :username")
    List<Users> findAllExceptUsername(@Param("username") String username);
}
