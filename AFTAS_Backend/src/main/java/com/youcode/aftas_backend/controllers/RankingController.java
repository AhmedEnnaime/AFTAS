package com.youcode.aftas_backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youcode.aftas_backend.models.dto.RankingDto;
import com.youcode.aftas_backend.models.embeddables.CompetitionMember;
import com.youcode.aftas_backend.services.RankingService;
import com.youcode.aftas_backend.superClasses.Controller;

@RestController
@RequestMapping(path = "api/rankings", produces = MediaType.APPLICATION_JSON_VALUE)
@Validated
public class RankingController extends Controller<RankingDto, CompetitionMember> {

    private RankingService rankingService;

    @Autowired
    public void setRankingService(RankingService rankingService) {
        this.rankingService = rankingService;
    }

    @GetMapping("/competition/{code}")
    public ResponseEntity<List<RankingDto>> getCompetitionRankings(@PathVariable("code") String competitionCode) {
        return new ResponseEntity<>(
            rankingService.SetUpCompetitionRankings(competitionCode),
            HttpStatus.OK
        );
    }

    @DeleteMapping("/competition/{competition-code}/member/{member-num}")
    public ResponseEntity<String> delete(@PathVariable("competition-code") final String competitionCode, @PathVariable("member-num") final Integer memberNum) {
        rankingService.deleteRanking(competitionCode, memberNum);
        return new ResponseEntity<>("Ranking deleted successfully.",HttpStatus.NO_CONTENT);
    } 
}
