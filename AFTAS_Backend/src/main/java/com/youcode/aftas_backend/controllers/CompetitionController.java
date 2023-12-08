package com.youcode.aftas_backend.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.youcode.aftas_backend.models.dto.CompetitionDto;
import com.youcode.aftas_backend.superClasses.Controller;

@RestController
public class CompetitionController extends Controller<CompetitionDto, String> {}
