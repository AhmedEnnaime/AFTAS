package com.youcode.aftas_backend.services.Impl;

import com.youcode.aftas_backend.models.dto.RankingDto;
import com.youcode.aftas_backend.models.dto.competetion.CompetitionDto;
import com.youcode.aftas_backend.models.embeddables.CompetitionMember;
import com.youcode.aftas_backend.models.entities.Competition;
import com.youcode.aftas_backend.models.entities.Fish;
import com.youcode.aftas_backend.models.entities.Hunting;
import com.youcode.aftas_backend.models.entities.Level;
import com.youcode.aftas_backend.models.entities.Member;
import com.youcode.aftas_backend.models.entities.Ranking;
import com.youcode.aftas_backend.models.enums.IdentityDocumentType;
import com.youcode.aftas_backend.repositories.RankingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.time.LocalDate;
import java.time.LocalDateTime;

import java.util.Arrays;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;

@ExtendWith(MockitoExtension.class)
public class RankingServiceImplTest {

    @Mock private RankingRepository rankingRepository;
    @Mock private ModelMapper modelMapper;
    @Mock private HuntingServiceImpl huntingService;
    @Mock private CompetitionServiceImpl competitionService;

    @InjectMocks
    private RankingServiceImpl underTest;

    private Member member;
    private Competition competition;
    private Ranking ranking;
    private RankingDto rankingDto;
    private CompetitionDto competitionDto;
    private Hunting hunting;


    @BeforeEach
    public void setUp() {
        member = Member.builder()
                .num(1)
                .name("ahmed")
                .accessionDate(LocalDate.now())
                .familyName("test")
                .identityDocument(IdentityDocumentType.CIN)
                .nationality("MA")
                .identityNumber("HH121093")
                .build();
        competition = Competition.builder()
                .code("Saf-12-12-23")
                .date(LocalDate.now())
                .startTime(LocalDateTime.now())
                .endTime(LocalDateTime.now())
                .amount(100.00)
                .location("Safi")
                .build();
        
        hunting = Hunting.builder()
                         .numberOfFish(1)
                         .fish(Fish.builder()
                                .level(Level.builder()
                                            .points(10)
                                            .build()
                                ).build()
                         )
                         .build();
        
        
        CompetitionMember id = CompetitionMember.builder()
                .memberNum(1)
                .competitionCode("Saf-12-12-23")
                .build();
        competitionDto = new CompetitionDto();
        competitionDto.setCode("Saf-12-12-23");
        competitionDto.setDate(LocalDate.now());
        competitionDto.setAmount(120.00);
        competitionDto.setStartTime(LocalDateTime.now());
        competitionDto.setEndTime(LocalDateTime.now());

        ranking = Ranking.builder()
                .id(id)
                .score(0)
                .member(member)
                .competition(competition)
                .build();
        rankingDto = new RankingDto();
        rankingDto.setId(id);
        rankingDto.setScore(0);
        rankingDto.setCompetition(competitionDto);
    }

    @Test
    public void underTestMethodShouldThrowsARunTimeExceptionWhenANotExistCompetitionCodePassed() {
        String competitionCode = "Not exist";
        given(competitionService.findByID(competitionCode)).willThrow(RuntimeException.class);

        assertThatExceptionOfType(RuntimeException.class)
        .isThrownBy(() -> underTest.SetUpCompetitionRankings(competitionCode));

        verify(competitionService).findByID(competitionCode);
    }

    @Test
    public void underTestMethodShouldThrowsARunTimeExceptionWhenTheCompetitionDidNotStartYet() {
        var competition = competitionDto;
        competition.setStartTime(LocalDateTime.of(30, 1, 15, 0, 0));
        given(competitionService.findByID("code")).willReturn(competitionDto);
        assertThatExceptionOfType(RuntimeException.class)
        .isThrownBy(() -> underTest.SetUpCompetitionRankings("code"));

        verify(competitionService).findByID("code");
    }

    @Test
    public void underTestMethodShouldThrowsARunTimeExceptionWhenTheCompetitionHaveNoRankings() {
        var competition = competitionDto;
        competition.setRankings(Arrays.asList());
        given(competitionService.findByID("code")).willReturn(competitionDto);
        given(rankingRepository.findByCompetitionCode("code")).willReturn(Arrays.asList());
        assertThatExceptionOfType(RuntimeException.class)
        .isThrownBy(() -> underTest.SetUpCompetitionRankings("code"));

        verify(competitionService).findByID("code");
        verify(rankingRepository).findByCompetitionCode("code");
    }

    @Test
    public void underTestMethodShouldThrowsARunTimeExceptionWhenCompetitionRankingsAreAlreadySetUp() {
        rankingDto.setRank(1);
        competitionDto.setRankings(Arrays.asList(rankingDto));
        ranking.setRank(1);

        given(competitionService.findByID("code")).willReturn(competitionDto);
        given(rankingRepository.findByCompetitionCode("code")).willReturn(Arrays.asList(ranking));
        assertThatExceptionOfType(RuntimeException.class)
        .isThrownBy(() -> underTest.SetUpCompetitionRankings("code"));

        verify(competitionService).findByID("code");
        verify(rankingRepository).findByCompetitionCode("code");
    }

    // //@Test
    // public void underTestMethodSouldReturnTheRankingsSortedWhenSuccsess() {
    //     var memberOne = Member.builder().num(1).build();
    //     var memberTwo = Member.builder().num(2).build();
    //     //var hanting_one = this. 

    //     //given(competitionService.findByID("code")).willReturn(competitionDto);
    //     //given(rankingRepository.findByCompetitionCode("code")).willReturn(Arrays.asList(ranking));

    // }

}
