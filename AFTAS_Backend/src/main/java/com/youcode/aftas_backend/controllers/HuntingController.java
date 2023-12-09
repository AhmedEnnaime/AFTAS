package com.youcode.aftas_backend.controllers;

import com.youcode.aftas_backend.models.dto.hunting.HuntFishNbrDto;
import com.youcode.aftas_backend.models.dto.hunting.SingleHuntDto;
import com.youcode.aftas_backend.models.dto.hunting.SpecificHuntDto;
import com.youcode.aftas_backend.models.dto.hunting.HuntingDto;
import com.youcode.aftas_backend.services.HuntingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hunting")
@Validated
public class HuntingController {
    @Autowired
    private HuntingService huntingService;
    @PostMapping
    public ResponseEntity<SingleHuntDto> createHunt(@Valid @RequestBody  HuntingDto huntDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(
                huntingService.createHunt(huntDto)
        );
    }

    @PostMapping("/batch")
    public ResponseEntity<List<SingleHuntDto>> createBatch(@RequestBody List<HuntingDto> hunts){
        return ResponseEntity.status(HttpStatus.CREATED).body(
                huntingService.createHuntBatch(hunts)
        );
    }

    @GetMapping
    public ResponseEntity<List<SingleHuntDto>> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(
                huntingService.getHunts()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable int id){
        return ResponseEntity.status(HttpStatus.OK).body("hunt deleted with success");
    }

    @PatchMapping("/{id}")
    public ResponseEntity<SingleHuntDto> editNumberOfFish(@PathVariable int id, @RequestBody @Valid HuntFishNbrDto HuntNbrDTO){
        return ResponseEntity.status(HttpStatus.FOUND).body(
                huntingService.updateNumberOfFish(id, HuntNbrDTO.getNumberOfFish())
        );
    }

    @GetMapping("/specific")
    public ResponseEntity<List<SingleHuntDto>> huntDetails(@Valid @RequestBody  SpecificHuntDto specificHuntDto){
        return ResponseEntity.status(HttpStatus.FOUND).body(
                huntingService.findHuntByCompetitionAndMember(
                        specificHuntDto.getCompetition_code(), specificHuntDto.getMember_num()
                )
        );
    }
}
