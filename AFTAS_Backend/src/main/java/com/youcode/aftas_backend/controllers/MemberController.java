package com.youcode.aftas_backend.controllers;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/members", produces = MediaType.APPLICATION_JSON_VALUE)
public class MemberController {}
