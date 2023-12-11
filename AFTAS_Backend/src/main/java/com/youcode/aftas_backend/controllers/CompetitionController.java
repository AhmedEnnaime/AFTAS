package com.youcode.aftas_backend.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.youcode.aftas_backend.models.dto.competetion.CompetitionDto;
import com.youcode.aftas_backend.services.CompetitionService;
import com.youcode.aftas_backend.superClasses.Controller;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@AllArgsConstructor

@RestController
@Validated
@RequestMapping(path = "api/competitions", produces = MediaType.APPLICATION_JSON_VALUE)
public class CompetitionController extends Controller<CompetitionDto, String> {

    private final CompetitionService competitionService;

    @GetMapping("/all")
    public ResponseEntity<List<CompetitionDto>> getAllCompetitions(@RequestParam(defaultValue = "0") final Integer page, @RequestParam(defaultValue = "10") final Integer size) {
        return new ResponseEntity<>(competitionService.getAllCompetitions(page, size), HttpStatus.OK);
    }

    @GetMapping("/current")
    public ResponseEntity<List<CompetitionDto>> getCurrentCompetitions(@RequestParam(defaultValue = "0") final Integer page,@RequestParam(defaultValue = "10") final Integer size) {
        var foundedDto = competitionService.getOnGoingCompetition(page, size);
        return new ResponseEntity<>(foundedDto, HttpStatus.OK);
    }

    @GetMapping("/future")
    public ResponseEntity<List<CompetitionDto>> getFutureCompetitions(@RequestParam(defaultValue = "0") final Integer page,@RequestParam(defaultValue = "10") final Integer size) {
        var foundedDto = competitionService.getFutureCompetitions(page, size);
        return new ResponseEntity<>(foundedDto, HttpStatus.OK);
    }

    @GetMapping("/closed")
    public ResponseEntity<List<CompetitionDto>> getClosedCompetitions(@RequestParam(defaultValue = "0") final Integer page,@RequestParam(defaultValue = "10") final Integer size) {
        var foundedDto = competitionService.getClosedCompetitions(page, size);
        return new ResponseEntity<>(foundedDto, HttpStatus.OK);
    }
}
