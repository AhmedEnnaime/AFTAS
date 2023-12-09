package com.youcode.aftas_backend.services;

import java.util.List;

import com.youcode.aftas_backend.models.dto.Member.MemberDto;
import com.youcode.aftas_backend.superClasses.ServiceInterface;

public interface MemberService extends ServiceInterface<MemberDto, Integer> {

    List<MemberDto> getByName(String name);
    List<MemberDto> getByFamilyName(String familyName);
}
