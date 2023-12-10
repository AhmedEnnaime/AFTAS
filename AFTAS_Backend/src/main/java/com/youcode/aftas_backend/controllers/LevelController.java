package com.youcode.aftas_backend.controllers;

import com.youcode.aftas_backend.models.dto.LevelDto;
import com.youcode.aftas_backend.superClasses.Controller;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(path = "api/levels", produces = MediaType.APPLICATION_JSON_VALUE)
@Validated
public class LevelController extends Controller<LevelDto, Integer> {

}
