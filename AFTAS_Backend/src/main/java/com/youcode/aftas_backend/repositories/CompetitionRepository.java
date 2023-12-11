package com.youcode.aftas_backend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.youcode.aftas_backend.models.entities.Competition;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface CompetitionRepository extends JpaRepository<Competition, String> {

    public boolean existsByDate(LocalDate date);
    public Page<Competition> findByDate(LocalDate date, Pageable pageable);
    public Page<Competition> findByDateBefore(LocalDate date, Pageable pageable);
    public Page<Competition> findByDateAfter(LocalDate date, Pageable pageable);
}
