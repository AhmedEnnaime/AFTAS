package com.youcode.aftas_backend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youcode.aftas_backend.models.dto.Member.MemberDto;
import com.youcode.aftas_backend.services.MemberService;
import com.youcode.aftas_backend.superClasses.Controller;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/members", produces = MediaType.APPLICATION_JSON_VALUE)
@Validated
public class MemberController extends Controller<MemberDto, Integer> {

    private final MemberService memberService;


    @GetMapping("/name/{name}")
    @PreAuthorize("hasAnyAuthority('JURY', 'MANAGER')")
    public ResponseEntity<List<MemberDto>> getMembersByName(@PathVariable("name") String name) {
        return new ResponseEntity<>(memberService.getByName(name), HttpStatus.OK);
    }

    @GetMapping("/family-name/{family-name}")
    @PreAuthorize("hasAnyAuthority('JURY', 'MANAGER')")
    public ResponseEntity<List<MemberDto>> getMembersByFamilyName(@PathVariable("family-name") String familyName) {
        return new ResponseEntity<>(memberService.getByFamilyName(familyName), HttpStatus.OK);
    }
}
