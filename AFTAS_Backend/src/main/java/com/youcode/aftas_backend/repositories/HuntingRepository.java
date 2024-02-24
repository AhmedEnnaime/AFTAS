package com.youcode.aftas_backend.repositories;

import com.youcode.aftas_backend.models.entities.Hunting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HuntingRepository extends JpaRepository<Hunting, Integer> {
    boolean existsHuntingByFishNameAndMemberIdAndCompetitionCode(String name, int number, String code);
    Hunting findHuntingByFishNameAndMemberIdAndCompetitionCode(String name, int number, String code);
    List<Hunting> findHuntingByCompetitionCodeAndMemberId(String code, int num);
}
