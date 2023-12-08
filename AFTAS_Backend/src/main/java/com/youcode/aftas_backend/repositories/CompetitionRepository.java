package com.youcode.aftas_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.youcode.aftas_backend.models.entities.Competition;
import java.time.LocalDate;
import java.util.List;


public interface CompetitionRepository extends JpaRepository<Competition, String> {

    public Competition findByDate(LocalDate date);
    public List<Competition> findByDateFieldBefore(LocalDate date);
    public List<Competition> findByDateFieldAfter(LocalDate date);
}
