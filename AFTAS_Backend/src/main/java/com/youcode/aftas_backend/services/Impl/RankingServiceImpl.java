package com.youcode.aftas_backend.services.Impl;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.youcode.aftas_backend.exceptions.ResourceNotFoundException;
import com.youcode.aftas_backend.models.dto.RankingDto;
import com.youcode.aftas_backend.models.embeddables.CompetitionMember;
import com.youcode.aftas_backend.models.entities.Ranking;
import com.youcode.aftas_backend.repositories.RankingRepository;
import com.youcode.aftas_backend.services.CompetitionService;
import com.youcode.aftas_backend.services.HuntingService;
import com.youcode.aftas_backend.services.MemberService;
import com.youcode.aftas_backend.services.RankingService;

import lombok.AllArgsConstructor;

@AllArgsConstructor

@Service
public class RankingServiceImpl implements RankingService {

    private final RankingRepository rankingRepository;
    private final HuntingService huntingService;
    private final MemberService memberService;
    private final CompetitionService competitionService;
    private final ModelMapper modelMapper;

    @Override
    public RankingDto save(RankingDto rankingDto) {
        var competition = competitionService.findByID(rankingDto.getId().getCompetitionCode());
        if(competition.getDate().isEqual((LocalDate.now(ZoneId.of("Africa/Casablanca")))) || 
            competition.getDate().isAfter(LocalDate.now(ZoneId.of("Africa/Casablanca")))
        ) 
            throw new RuntimeException("The competition is already closed.");
        if(competition.getNumberOfParticipants() <= rankingRepository.countByCompetitionCode(competition.getCode()))
            throw new RuntimeException("The cometition is full.");
        
        rankingDto.setCompetition(competition);
        rankingDto.setMember(memberService.findByID(rankingDto.getId().getMemberNum()));
        Ranking rankingEntity = modelMapper.map(rankingDto, Ranking.class);
        Ranking savedRanking = rankingRepository.save(rankingEntity);
        return modelMapper.map(savedRanking, RankingDto.class);
    }

    @Override
    public List<RankingDto> getAll() {
        return Arrays.asList(modelMapper.map(rankingRepository.findAll(), RankingDto[].class));
    }

    @Override
    public RankingDto update(CompetitionMember identifier, RankingDto rankingDto) {
        rankingDto.setId(identifier);
        rankingDto.setCompetition(null);
        rankingDto.setMember(null);
        return this.save(rankingDto);
    }

    public CompetitionMember deleteRanking(final String competitionCode, final Integer memberNum) {
        var rankingIdentifier = CompetitionMember.builder()
                                                 .competitionCode(competitionCode)
                                                 .memberNum(memberNum)
                                                 .build();
        delete(rankingIdentifier);
        return rankingIdentifier;
    }

    @Override
    public void delete(final CompetitionMember identifier) {
        rankingRepository.deleteById(identifier);
    }

    @Override
    public RankingDto findByID(CompetitionMember identifier) {
        Ranking foundedRanking = rankingRepository.findById(identifier)
                    .orElseThrow(() -> new ResourceNotFoundException("The ranking with credentials: " + identifier + " does not exist."));
        return modelMapper.map(foundedRanking, RankingDto.class);
    }

    @Override
    public List<RankingDto> SetUpCompetitionRankings(String competitionCode) {
        List<Ranking> rankings = rankingRepository.findByCompetitionCode(competitionCode);
        if(rankings.isEmpty())
            throw new RuntimeException("There are no rankings in the given competition.");
        rankings.forEach(
                    ranking -> {
                        ranking.setScore(
                            huntingService.findHuntByCompetitionAndMember(competitionCode, ranking.getMember().getNum())
                            .stream()
                            .mapToInt(hunt -> hunt.getNumberOfFish() * hunt.getFish().getLevel().getPoints() )
                            .sum()
                        );
                    } 
                );
        rankings.sort(Comparator.comparingInt(Ranking::getScore).reversed());
        int rank = 1;
        for(Ranking ranking :  rankings)
            ranking.setRank(rank++);
        
        return Arrays.asList(
            modelMapper.map(
                rankingRepository.saveAll(rankings),
                RankingDto[].class
            )
        );
    }

    
}
