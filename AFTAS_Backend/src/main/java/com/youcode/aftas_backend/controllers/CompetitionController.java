package com.youcode.aftas_backend.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.youcode.aftas_backend.models.dto.competetion.CompetitionDto;
import com.youcode.aftas_backend.superClasses.Controller;

import lombok.AllArgsConstructor;

import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;

@AllArgsConstructor

@RestController
@RequestMapping(path = "api/competitions", produces = MediaType.APPLICATION_JSON_VALUE)
@Validated
public class CompetitionController extends Controller<CompetitionDto, String> {}
