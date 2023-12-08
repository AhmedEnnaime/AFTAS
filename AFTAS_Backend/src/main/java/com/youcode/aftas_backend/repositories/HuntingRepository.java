package com.youcode.aftas_backend.repositories;

import com.youcode.aftas_backend.models.entities.Hunting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HuntingRepository extends JpaRepository<Hunting, Integer> {
    boolean existsHuntingByFishNameAndMemberNumAndCompetitionCode(String name, int number, String code);
    Hunting findHuntingByFishNameAndMemberNumAndCompetitionCode(String name, int number, String code);
}
