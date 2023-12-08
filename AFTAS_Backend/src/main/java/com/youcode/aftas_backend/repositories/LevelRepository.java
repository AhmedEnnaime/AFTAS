package com.youcode.aftas_backend.repositories;

import com.youcode.aftas_backend.models.entities.Level;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LevelRepository extends JpaRepository<Level, Integer> {
    List<Level> findByPointsGreaterThanEqual(Integer points);
}
