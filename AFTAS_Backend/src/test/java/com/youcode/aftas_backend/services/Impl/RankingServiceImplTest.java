package com.youcode.aftas_backend.services.Impl;

import com.youcode.aftas_backend.models.dto.RankingDto;
import com.youcode.aftas_backend.models.dto.competetion.CompetitionDto;
import com.youcode.aftas_backend.models.embeddables.CompetitionMember;
import com.youcode.aftas_backend.models.entities.Competition;
import com.youcode.aftas_backend.models.entities.Member;
import com.youcode.aftas_backend.models.entities.Ranking;
import com.youcode.aftas_backend.models.enums.IdentityDocumentType;
import com.youcode.aftas_backend.repositories.HuntingRepository;
import com.youcode.aftas_backend.repositories.RankingRepository;
import com.youcode.aftas_backend.services.Impl.CompetitionServiceImpl;
import com.youcode.aftas_backend.services.Impl.HuntingServiceImpl;
import com.youcode.aftas_backend.services.Impl.MemberServiceImpl;
import com.youcode.aftas_backend.services.Impl.RankingServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.time.LocalDate;
import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class RankingServiceImplTest {

    @Mock
    private RankingRepository rankingRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private RankingServiceImpl rankingService;

    private Member member;

    private Competition competition;

    private Ranking ranking;

    private RankingDto rankingDto;

    private CompetitionDto competitionDto;

    @Mock
    private MemberServiceImpl memberService;

    @Mock
    private HuntingServiceImpl huntingService;

    @Mock
    private CompetitionServiceImpl competitionService;

    @Mock
    private HuntingRepository huntingRepository;

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
                .rank(1)
                .score(30)
                .member(member)
                .competition(competition)
                .build();
        rankingDto = new RankingDto();
        rankingDto.setId(id);
        rankingDto.setRank(1);
        rankingDto.setScore(100);
        rankingDto.setCompetition(competitionDto);
    }

    @Test
    public void testSetUpCompetitionRankingsWhenCompetitionCodeNotValid() {
        String competitionCode = "Saf-12-12-23";
        given(rankingRepository.findByCompetitionCode(competitionCode)).willReturn(Collections.emptyList());
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            rankingService.SetUpCompetitionRankings(competitionCode);
        });
        assertThat(exception.getMessage()).isEqualTo("There are no rankings in the given competition.");
    }
    //@Test
    public void testSetupCompetitionRankingsWhenCompetitionCodeValid() {
        String competitionCode = "Ims-12-12-23";
        CompetitionMember rankingId1 = CompetitionMember.builder()
                .competitionCode("Ims-12-12-23")
                .memberNum(1)
                .build();

        Competition competition1 = Competition.builder()
                .code("Ims-12-12-23")
                .date(LocalDate.now())
                .startTime(LocalDateTime.now())
                .endTime(LocalDateTime.now())
                .amount(100.00)
                .location("Imseouane")
                .build();

        Member member1 = Member.builder()
                .num(1)
                .name("Ahmed")
                .accessionDate(LocalDate.now())
                .familyName("Test")
                .identityDocument(IdentityDocumentType.CIN)
                .nationality("MA")
                .identityNumber("HH121093")
                .build();

        Ranking ranking1 = Ranking.builder()
                .id(rankingId1)
                .rank(1)
                .score(30)
                .competition(competition1)
                .member(member1)
                .build();
//        System.out.println("Competition 1 :" + competition1.getLocation());
//        System.out.println("Member 1 :" + member1.getName());
//        System.out.println("Ranking 1 :" + ranking1.getCompetition().getLocation());
        List<Ranking> sampleRankings = Arrays.asList(ranking, ranking1);
//        System.out.println("Rankings size : " + sampleRankings.size());
        System.out.println("competition date " + rankingDto.getCompetition().getDate());
        given(rankingRepository.findByCompetitionCode(competitionCode)).willReturn(sampleRankings);
        List<RankingDto> result = rankingService.SetUpCompetitionRankings(competitionCode);
        assertEquals(sampleRankings.size(), result.size());

    }

}
