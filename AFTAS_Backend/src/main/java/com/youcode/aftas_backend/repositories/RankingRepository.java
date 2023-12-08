package com.youcode.aftas_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.youcode.aftas_backend.models.embeddables.CompetitionMember;
import com.youcode.aftas_backend.models.entities.Ranking;
import org.springframework.stereotype.Repository;

@Repository
public interface RankingRepository extends JpaRepository<Ranking, CompetitionMember> {}
