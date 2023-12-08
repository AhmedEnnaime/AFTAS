package com.youcode.aftas_backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.youcode.aftas_backend.models.entities.Member;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {

    public List<Member> findByName(String name); 
    public List<Member> findByFamilyName(String familyName);
}
