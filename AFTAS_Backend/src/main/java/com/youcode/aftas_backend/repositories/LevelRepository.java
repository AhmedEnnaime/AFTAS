package com.youcode.aftas_backend.repositories;

import com.youcode.aftas_backend.models.entities.Level;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LevelRepository extends JpaRepository<Level, Integer> {
    List<Level> findByPointsGreaterThanEqual(Integer points);
}
