package com.youcode.aftas_backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youcode.aftas_backend.models.dto.Member.MemberDto;
import com.youcode.aftas_backend.services.MemberService;
import com.youcode.aftas_backend.superClasses.Controller;

@RestController
@RequestMapping(path = "api/members", produces = MediaType.APPLICATION_JSON_VALUE)
@Validated
public class MemberController extends Controller<MemberDto, Integer> {

    private MemberService memberService;

    @Autowired
    public void setMemberService(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/name/{name}")
    public List<MemberDto> getMembersByName(@PathVariable("name") String name) {
        return memberService.getByName(name);
    }

    @GetMapping("/family-name/{family-name}")
    public List<MemberDto> getMembersByFamilyName(@PathVariable("family-name") String familyName) {
        return memberService.getByFamilyName(familyName);
    }
}
