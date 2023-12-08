package com.youcode.aftas_backend.controllers;

import com.youcode.aftas_backend.models.dto.LevelDto;
import com.youcode.aftas_backend.models.dto.fish.FishDto;
import com.youcode.aftas_backend.models.dto.fish.FishDtoResponse;
import com.youcode.aftas_backend.services.FishService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/fishes", produces = MediaType.APPLICATION_JSON_VALUE)
@Validated
public class FishController {

    @Autowired
    private FishService fishService;

    @PostMapping
    public ResponseEntity<FishDto> createFish(@Valid @RequestBody FishDto fishDto) {
        FishDto createdFish = fishService.save(fishDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFish);
    }

    @GetMapping
    public ResponseEntity<List<FishDtoResponse>> getFishes() {
        List<FishDtoResponse> fishes = fishService.getAll();
        return ResponseEntity.ok(fishes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FishDtoResponse> findFishByID(@PathVariable String id) {
        FishDtoResponse fish = fishService.findByID(id);
        return ResponseEntity.ok(fish);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FishDto> updateFish(@PathVariable String id, @Valid @RequestBody FishDto fishDto) {
        FishDto updatedFish = fishService.update(id, fishDto);
        return ResponseEntity.ok(updatedFish);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFish(@PathVariable String id) {
        fishService.delete(id);
        return new ResponseEntity<>("Fish deleted successfully", HttpStatus.OK);
    }
}
