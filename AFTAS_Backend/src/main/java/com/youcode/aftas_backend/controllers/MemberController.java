package com.youcode.aftas_backend.controllers;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youcode.aftas_backend.models.dto.Member.MemberDto;
import com.youcode.aftas_backend.superClasses.Controller;

@RestController
@RequestMapping(path = "api/members", produces = MediaType.APPLICATION_JSON_VALUE)
public class MemberController extends Controller<MemberDto, Integer> {}
