package com.youcode.aftas_backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.youcode.aftas_backend.models.entities.User;
import com.youcode.aftas_backend.models.enums.ROLE;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    public Optional<User> findByUsername(String username);
    @Modifying
    @Query("UPDATE User u SET u.isEnabled = true WHERE u.username = :username")
    void enableAccount(String username);
    @Modifying
    @Query("UPDATE User u SET u.role = :role WHERE u.username = :username")
    void upgradeUserRole(String username, ROLE role);
    // @Modifying
    // @Query("UPDATE User u SET u.dtype = 'Member' WHERE u.dtype = 'User'")
    // void updateDType();
}
