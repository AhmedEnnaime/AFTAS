package com.youcode.aftas_backend.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.youcode.aftas_backend.models.embeddables.CompetitionMember;
import com.youcode.aftas_backend.models.entities.Ranking;
import org.springframework.stereotype.Repository;

@Repository
public interface RankingRepository extends JpaRepository<Ranking, CompetitionMember> {

    Integer countByCompetitionCode(String competitionCode);
    List<Ranking> findByCompetitionCode(String competitionCode);
}
