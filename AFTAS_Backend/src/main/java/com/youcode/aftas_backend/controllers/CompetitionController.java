package com.youcode.aftas_backend.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.youcode.aftas_backend.models.dto.competetion.CompetitionDto;
import com.youcode.aftas_backend.services.CompetitionService;
import com.youcode.aftas_backend.superClasses.Controller;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@AllArgsConstructor

@RestController
@RequestMapping(path = "api/competitions", produces = MediaType.APPLICATION_JSON_VALUE)
public class CompetitionController extends Controller<CompetitionDto, String> {

    private CompetitionService competitionService;

    @GetMapping(path = "/{id}")
    public ResponseEntity<CompetitionDto> finishCompetition(@PathVariable(name = "id") String id) {
        return new ResponseEntity<CompetitionDto>(
            competitionService.getResult(id),
            HttpStatus.OK
        );
    }
}
