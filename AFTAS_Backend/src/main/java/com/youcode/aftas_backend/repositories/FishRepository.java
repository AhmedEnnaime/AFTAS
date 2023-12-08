package com.youcode.aftas_backend.repositories;

import com.youcode.aftas_backend.models.entities.Level;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FishRepository extends JpaRepository<Level, String> {
}
