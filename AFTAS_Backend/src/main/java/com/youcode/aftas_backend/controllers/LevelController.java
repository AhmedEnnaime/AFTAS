package com.youcode.aftas_backend.controllers;

import com.youcode.aftas_backend.models.dto.LevelDto;
import com.youcode.aftas_backend.services.LevelService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/levels", produces = MediaType.APPLICATION_JSON_VALUE)
@Validated
public class LevelController {

    @Autowired
    private LevelService levelService;

    @PostMapping
    public ResponseEntity<LevelDto> createLevel(@Valid @RequestBody LevelDto levelDto) {
        LevelDto createdLevel = levelService.save(levelDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdLevel);
    }

    @GetMapping
    public ResponseEntity<List<LevelDto>> getLevels() {
        List<LevelDto> levels = levelService.getAll();
        return ResponseEntity.ok(levels);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LevelDto> findLevelByID(@PathVariable Integer id) {
        LevelDto level = levelService.findByID(id);
        return ResponseEntity.ok(level);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LevelDto> updateLevel(@PathVariable Integer id, @Valid @RequestBody LevelDto levelDto) {
        LevelDto updatedLevel = levelService.update(id, levelDto);
        return ResponseEntity.ok(updatedLevel);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLevel(@PathVariable Integer id) {
        levelService.delete(id);
        return new ResponseEntity<>("Level deleted successfully", HttpStatus.OK);
    }
}
