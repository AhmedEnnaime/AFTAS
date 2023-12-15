package com.youcode.aftas_backend.services.Impl;

import com.youcode.aftas_backend.exceptions.ResourceNotFoundException;
import com.youcode.aftas_backend.models.dto.hunting.SingleHuntDto;
import com.youcode.aftas_backend.models.dto.hunting.HuntingDto;
import com.youcode.aftas_backend.models.entities.Hunting;
import com.youcode.aftas_backend.repositories.CompetitionRepository;
import com.youcode.aftas_backend.repositories.FishRepository;
import com.youcode.aftas_backend.repositories.HuntingRepository;
import com.youcode.aftas_backend.repositories.MemberRepository;
import com.youcode.aftas_backend.services.HuntingService;

import lombok.AllArgsConstructor;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@AllArgsConstructor

@Service
public class HuntingServiceImpl implements HuntingService {

    private HuntingRepository huntingRepository;
    private FishRepository fishRepository;
    private CompetitionRepository competitionRepository;
    private MemberRepository memberRepository;
    private ModelMapper modelMapper;

    @Override
    public SingleHuntDto createHunt(HuntingDto hunting){
        Hunting huntingInstance;
        if(huntingRepository.existsHuntingByFishNameAndMemberNumAndCompetitionCode(
                hunting.getFish_name(),
                hunting.getMember_num(),
                hunting.getCompetition_code()
        )){
            huntingInstance = huntingRepository.findHuntingByFishNameAndMemberNumAndCompetitionCode(hunting.getFish_name(), hunting.getMember_num(), hunting.getCompetition_code());
            huntingInstance.setNumberOfFish( huntingInstance.getNumberOfFish() + hunting.getNumberOfFish() );
        } else {
            huntingInstance = Hunting.builder().numberOfFish(hunting.getNumberOfFish())
                                               .fish(fishRepository.findById(hunting.getFish_name()).get())
                                               .competition(competitionRepository.findById(hunting.getCompetition_code()).get())
                                               .member(memberRepository.findById(hunting.getMember_num()).get())
                                               .build();
        }
        validateHunt(huntingInstance);
        return modelMapper.map(huntingRepository.save(huntingInstance), SingleHuntDto.class);
    }

    private void validateHunt(Hunting hunting) {
        if(LocalDateTime.now(ZoneId.of("Africa/Casablanca")).isBefore(hunting.getCompetition().getStartTime()))
                throw new RuntimeException("Competition did not start  yet.");
            if(LocalDateTime.now(ZoneId.of("Africa/Casablanca")).isAfter(hunting.getCompetition().getEndTime())
                || LocalDateTime.now(ZoneId.of("Africa/Casablanca")).isEqual(hunting.getCompetition().getEndTime())
            )
                throw new RuntimeException("Competition is already closed.");
            if(hunting.getCompetition().getRankings().isEmpty())
                throw new RuntimeException("Competition have no rankings.");
            if(hunting.getCompetition().getRankings().get(0).getRank() != null)
                throw new RuntimeException("Competition rankings already counted.");
    }

    @Override
    public List<SingleHuntDto> createHuntBatch(List<HuntingDto> hunts){
        List<SingleHuntDto> lists = new ArrayList<>();
        if(hunts.isEmpty())
            throw new ResourceNotFoundException("can't proccess batch on empty array");
        for(HuntingDto hunt:hunts)
            lists.add(createHunt(hunt));
        return lists;
    }

    @Override
    public SingleHuntDto getHuntById(int id){
        if(!huntingRepository.existsById(id))
            throw new ResourceNotFoundException("invalid hunt id");
        return modelMapper.map(huntingRepository.findById(id), SingleHuntDto.class);
    }

    @Override
    public List<SingleHuntDto> getHunts(){
        return Arrays.asList(modelMapper.map(huntingRepository.findAll(), SingleHuntDto[].class));
    }

    @Override
    public void deleteById(int id){
        if (!huntingRepository.existsById(id))
            throw new ResourceNotFoundException("invalid hunt id");
        huntingRepository.deleteById(id);
    }

    @Override
    public SingleHuntDto updateNumberOfFish(int id, int valueToAdd){
        if(!huntingRepository.existsById(id) || valueToAdd < 1)
            throw new ResourceNotFoundException("invalid hunt id or fish number is less than 1");
        Hunting huntingInstance = huntingRepository.findById(id).get();
        huntingInstance.setNumberOfFish(
                huntingInstance.getNumberOfFish()+valueToAdd
        );
        return modelMapper.map(huntingRepository.save(huntingInstance), SingleHuntDto.class);
    }

    @Override
    public List<SingleHuntDto> findHuntByCompetitionAndMember(String code, int num){
        return Arrays.asList(modelMapper.map(huntingRepository.findHuntingByCompetitionCodeAndMemberNum(code, num), SingleHuntDto[].class));
    }
}
