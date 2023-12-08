package com.youcode.aftas_backend.controllers;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/rankings", produces = MediaType.APPLICATION_JSON_VALUE)
public class RankingController {}
