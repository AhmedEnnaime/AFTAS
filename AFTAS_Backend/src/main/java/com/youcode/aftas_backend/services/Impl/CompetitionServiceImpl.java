package com.youcode.aftas_backend.services.Impl;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.youcode.aftas_backend.exceptions.ResourceNotFoundException;
import com.youcode.aftas_backend.models.dto.competetion.CompetitionDto;
import com.youcode.aftas_backend.models.entities.Competition;
import com.youcode.aftas_backend.repositories.CompetitionRepository;
import com.youcode.aftas_backend.services.CompetitionService;

import lombok.AllArgsConstructor;

@AllArgsConstructor

@Service
public class CompetitionServiceImpl implements CompetitionService {

    private final CompetitionRepository competitionRepository;
    private final ModelMapper modelMapper;

    @Override
    public CompetitionDto save(final CompetitionDto competitionDto) {            
        Competition competitionEntity = modelMapper.map(competitionDto, Competition.class);
        return 
            modelMapper.map(competitionRepository.save(competitionEntity),
             CompetitionDto.class);
    }

    @Override
    public List<CompetitionDto> getAll() {
        return Arrays.asList(modelMapper.map(competitionRepository.findAll(),
                            CompetitionDto[].class));
    }

    @Override
    public CompetitionDto update(String identifier, CompetitionDto competitionDto) {
        if(!competitionRepository.existsById(identifier)) 
            throw new ResourceNotFoundException("The competition with id " + identifier + " does not exist.");
        competitionDto.setCode(identifier);
        Competition competitionEntity = modelMapper.map(competitionDto, Competition.class);
        competitionRepository.save(competitionEntity);
        return modelMapper.map(competitionEntity, CompetitionDto.class);
    }

    @Override
    public void delete(String identifier) {
        if(!competitionRepository.existsById(identifier)) 
            throw new ResourceNotFoundException("The competition with id " + identifier + " does not exist.");
        competitionRepository.deleteById(identifier);
    }

    @Override
    public CompetitionDto findByID(String identifier) {
        Competition foundedCompetition = competitionRepository.findById(identifier)
                    .orElseThrow(() -> new ResourceNotFoundException("The competition with id " + identifier + " does not exist."));
        return modelMapper.map(foundedCompetition, CompetitionDto.class);
    }

    @Override
    public List<CompetitionDto> getOnGoingCompetition() {

        return Arrays.asList(modelMapper.map(competitionRepository.findByDate(LocalDate.now(ZoneId.of("Africa/Casablanca"))), 
               CompetitionDto[].class));
    }

    @Override
    public List<CompetitionDto> getClosedCompetitions() {
        return Arrays.asList(modelMapper.map(competitionRepository.findByDateBefore(LocalDate.now(ZoneId.of("Africa/Casablanca"))),
                            CompetitionDto[].class));
    }

    @Override
    public List<CompetitionDto> getFutureCompetitions() {
        return Arrays.asList(modelMapper.map(competitionRepository.findByDateAfter(LocalDate.now(ZoneId.of("Africa/Casablanca"))),
                            CompetitionDto[].class));
    }    
}
