package com.youcode.aftas_backend.services.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.youcode.aftas_backend.models.dto.MemberDto;
import com.youcode.aftas_backend.services.MemberService;

import lombok.AllArgsConstructor;

@AllArgsConstructor

@Service
public class MemberServiceImpl implements MemberService {

    private final MemberService memberService;

    @Override
    public MemberDto save(MemberDto dto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }

    @Override
    public List<MemberDto> getAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAll'");
    }

    @Override
    public MemberDto update(Integer identifier, MemberDto dto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public void delete(Integer identifier) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

    @Override
    public MemberDto findByID(Integer identifier) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByID'");
    }
    
}
