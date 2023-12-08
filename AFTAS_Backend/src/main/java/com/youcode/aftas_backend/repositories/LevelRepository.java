package com.youcode.aftas_backend.repositories;

import com.youcode.aftas_backend.models.entities.Level;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LevelRepository extends JpaRepository<Level, Long> {
}
