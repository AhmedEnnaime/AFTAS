package com.youcode.aftas_backend.services.Impl;

import com.youcode.aftas_backend.exceptions.ResourceNotFoundException;
import com.youcode.aftas_backend.models.dto.hunting.SingleHuntDto;
import com.youcode.aftas_backend.models.dto.hunting.huntingDto;
import com.youcode.aftas_backend.models.entities.Hunting;
import com.youcode.aftas_backend.repositories.CompetitionRepository;
import com.youcode.aftas_backend.repositories.FishRepository;
import com.youcode.aftas_backend.repositories.HuntingRepository;
import com.youcode.aftas_backend.repositories.MemberRepository;
import com.youcode.aftas_backend.services.HuntingService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class HuntingServiceImpl implements HuntingService {
    @Autowired
    private HuntingRepository huntingRepository;
    @Autowired
    private FishRepository fishRepository;
    @Autowired
    private CompetitionRepository competitionRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public SingleHuntDto createHunt(huntingDto hunting){
        Hunting huntingInstance;
        if(!huntingRepository.existsHuntingByFishNameAndMemberNumAndCompetitionCode(
                hunting.getFish_name(),
                hunting.getMember_num(),
                hunting.getCompetition_code()
        )){
            huntingInstance = Hunting.builder().numberOfFish(hunting.getNumberOfFish())
                                               .fish(fishRepository.findById(hunting.getFish_name()).get())
                                                       .competition(competitionRepository.findById(hunting.getCompetition_code()).get())
                                                               .member(memberRepository.findById(hunting.getMember_num()).get()).build();
        }else{
            huntingInstance = huntingRepository.findHuntingByFishNameAndMemberNumAndCompetitionCode(
                    hunting.getFish_name(),
                    hunting.getMember_num(),
                    hunting.getCompetition_code()
            );
            huntingInstance.setNumberOfFish(
                    hunting.getNumberOfFish() + hunting.getNumberOfFish()
            );
        }
        return modelMapper.map(huntingInstance, SingleHuntDto.class);
    }

    @Override
    public List<SingleHuntDto> createHuntBatch(List<huntingDto> hunts){
        List<SingleHuntDto> lists = new ArrayList<>();
        if(hunts.isEmpty())
            throw new ResourceNotFoundException("can't proccess batch on empty array");
        for(huntingDto hunt:hunts)
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
}
