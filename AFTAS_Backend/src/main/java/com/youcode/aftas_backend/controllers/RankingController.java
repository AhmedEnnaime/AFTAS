package com.youcode.aftas_backend.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.youcode.aftas_backend.models.dto.RankingDto;
import com.youcode.aftas_backend.models.embeddables.CompetitionMember;
import com.youcode.aftas_backend.services.RankingService;
import com.youcode.aftas_backend.superClasses.Controller;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/rankings", produces = MediaType.APPLICATION_JSON_VALUE)
@Validated
public class RankingController extends Controller<RankingDto, CompetitionMember> {

    private RankingService rankingService;

    @GetMapping("/competition/{code}")
    public ResponseEntity<List<RankingDto>> setCompetitionRankings(@PathVariable("code") final String competitionCode) {
        return new ResponseEntity<>(
            rankingService.SetUpCompetitionRankings(competitionCode),
            HttpStatus.OK
        );
    }

    @GetMapping("/competition")
    public ResponseEntity<List<RankingDto>> getCompetitionRankings(@RequestParam final String code) {
        return new ResponseEntity<>(
            rankingService.SetUpCompetitionRankings(code),
            HttpStatus.OK
        );
    }


    @DeleteMapping("/competition/{competition-code}/member/{member-num}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable("competition-code") final String competitionCode, @PathVariable("member-num") final Integer memberNum) {
        CompetitionMember deletedRankingIdentifier = rankingService.deleteRanking(competitionCode, memberNum);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Resource deleted successfully.");
        response.put("deletedElementIdentifier", deletedRankingIdentifier);
        return new ResponseEntity<>(response ,HttpStatus.OK);
    } 
}
