package com.youcode.aftas_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.youcode.aftas_backend.models.entities.Competition;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CompetitionRepository extends JpaRepository<Competition, String> {

    public boolean existsByDate(LocalDate date);
    public List<Competition> findByDate(LocalDate date);
    public List<Competition> findByDateBefore(LocalDate date);
    public List<Competition> findByDateAfter(LocalDate date);
}
