package com.youcode.aftas_backend.services.Impl;

import java.util.Arrays;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.youcode.aftas_backend.exceptions.ResourceNotFoundException;
import com.youcode.aftas_backend.models.dto.Member.MemberDto;
import com.youcode.aftas_backend.models.entities.Member;
import com.youcode.aftas_backend.repositories.MemberRepository;
import com.youcode.aftas_backend.services.MemberService;

import lombok.AllArgsConstructor;

@AllArgsConstructor

@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final ModelMapper modelMapper;

    @Override
    public MemberDto save(MemberDto memberDto) {
        Member memberEntity = modelMapper.map(memberDto, Member.class);
        Member savedMember = memberRepository.save(memberEntity);
        return modelMapper.map(savedMember, MemberDto.class);
    }

    @Override
    public List<MemberDto> getAll() {
        return Arrays.asList(modelMapper.map(memberRepository.findAll(),
                            MemberDto[].class));
    }

    @Override
    public MemberDto update(Integer identifier, MemberDto memberDto) {
        memberDto.setNum(identifier);
        return this.save(memberDto);
    }

    @Override
    public void delete(Integer identifier) {
        memberRepository.deleteById(identifier);
    }

    @Override
    public MemberDto findByID(Integer identifier) {
        Member foundedMember = memberRepository.findById(identifier)
                        .orElseThrow(() -> new ResourceNotFoundException("The member with the num " + identifier + " does not exist."));
        return modelMapper.map(foundedMember, MemberDto.class);
    }
    
}
