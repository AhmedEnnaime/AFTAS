package com.youcode.aftas_backend.services.Impl;

import com.youcode.aftas_backend.configuration.MapperConfig;
import com.youcode.aftas_backend.exceptions.ResourceNotFoundException;
import com.youcode.aftas_backend.models.dto.LevelDto;
import com.youcode.aftas_backend.models.entities.Level;
import com.youcode.aftas_backend.repositories.LevelRepository;
import com.youcode.aftas_backend.services.LevelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LevelServiceImpl implements LevelService {

    @Autowired
    private MapperConfig mapperConfig;

    @Autowired
    private LevelRepository levelRepository;

    @Override
    public LevelDto save(LevelDto levelDto) {
        return null;
    }

    @Override
    public List<LevelDto> getAll() {
        List<Level> levels = levelRepository.findAll();
        return levels.stream()
                .map(level -> mapperConfig.modelMapper().map(level, LevelDto.class))
                .toList();
    }

    @Override
    public LevelDto update(Integer integer, LevelDto levelDto) {
        Level existingLevel = levelRepository.findById(integer)
                .orElseThrow(() -> new ResourceNotFoundException("The level with ID " + integer + " does not exist"));

        existingLevel.setDescription(levelDto.getDescription());
        existingLevel.setPoints(levelDto.getPoints());

        Level updatedLevel = levelRepository.save(existingLevel);

        return mapperConfig.modelMapper().map(updatedLevel, LevelDto.class);
    }

    @Override
    public void delete(Integer integer) {
        Level level = levelRepository.findById(integer).orElseThrow(()
                -> new ResourceNotFoundException("The level with id " + integer + " does not exist"));
        levelRepository.delete(level);
    }

    @Override
    public LevelDto findByID(Integer integer) {
        Level level = levelRepository.findById(integer)
                .orElseThrow(() -> new ResourceNotFoundException("The level with ID " + integer + " does not exist"));

        return mapperConfig.modelMapper().map(level, LevelDto.class);
    }
}
