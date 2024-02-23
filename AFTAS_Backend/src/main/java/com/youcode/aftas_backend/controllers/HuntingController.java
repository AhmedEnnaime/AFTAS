package com.youcode.aftas_backend.controllers;

import com.youcode.aftas_backend.models.dto.hunting.HuntFishNbrDto;
import com.youcode.aftas_backend.models.dto.hunting.SingleHuntDto;
import com.youcode.aftas_backend.models.dto.hunting.SpecificHuntDto;
import com.youcode.aftas_backend.models.dto.hunting.HuntingDto;
import com.youcode.aftas_backend.services.HuntingService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hunting")
@Validated
@AllArgsConstructor
public class HuntingController {

    private HuntingService huntingService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('JURY', 'MANAGER')")
    public ResponseEntity<SingleHuntDto> createHunt(@Valid @RequestBody  HuntingDto huntDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(
                huntingService.createHunt(huntDto)
        );
    }

    @PostMapping("/batch")
    @PreAuthorize("hasAnyAuthority('JURY', 'MANAGER')")
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
    @PreAuthorize("hasAnyAuthority('JURY', 'MANAGER')")
    public ResponseEntity<Map<String, String>> deleteById(@PathVariable Integer id){
        huntingService.deleteById(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hunting deleted successfully.");
        response.put("deletedElementIdentifier", id.toString());
        return new ResponseEntity<>(response ,HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('JURY', 'MANAGER')")
    public ResponseEntity<SingleHuntDto> editNumberOfFish(@PathVariable int id, @RequestBody @Valid HuntFishNbrDto HuntNbrDTO){
        return ResponseEntity.status(HttpStatus.OK).body(
                huntingService.updateNumberOfFish(id, HuntNbrDTO.getNumberOfFish())
        );
    }

    @PostMapping("/specific")
    @PreAuthorize("hasAnyAuthority('JURY', 'MANAGER')")
    public ResponseEntity<List<SingleHuntDto>> huntDetails(@Valid @RequestBody  SpecificHuntDto specificHuntDto){
        return ResponseEntity.status(HttpStatus.OK).body(
                huntingService.findHuntByCompetitionAndMember(
                        specificHuntDto.getCompetition_code(), specificHuntDto.getMember_num()
                )
        );
    }
}
