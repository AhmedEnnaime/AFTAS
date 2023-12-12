package com.youcode.aftas_backend.services.Impl;

import com.youcode.aftas_backend.exceptions.PointsValidationException;
import com.youcode.aftas_backend.exceptions.ResourceNotFoundException;
import com.youcode.aftas_backend.models.dto.LevelDto;
import com.youcode.aftas_backend.models.entities.Level;
import com.youcode.aftas_backend.repositories.LevelRepository;
import com.youcode.aftas_backend.services.LevelService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class LevelServiceImpl implements LevelService {

    private ModelMapper modelMapper;

    private LevelRepository levelRepository;

    @Override
    public LevelDto save(LevelDto levelDto) {
        Optional<Level> existingLevelOpt = levelRepository.findById(levelDto.getCode());
        existingLevelOpt.ifPresent(level -> {
            throw new ResourceNotFoundException("The level with ID " + levelDto.getCode() + " already exists");
        });

        Optional<Level> minCodeLevelOpt = levelRepository.findTopByCodeLessThanOrderByCodeDesc(levelDto.getCode());
        Optional<Level> maxCodeLevelOpt = levelRepository.findTopByCodeGreaterThanOrderByCodeAsc(levelDto.getCode());

        Stream.of(minCodeLevelOpt, maxCodeLevelOpt)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .forEach(level -> {
                    if ((level == minCodeLevelOpt.get() && level.getPoints() >= levelDto.getPoints()) ||
                            (level == maxCodeLevelOpt.get() && level.getPoints() <= levelDto.getPoints())) {
                        throw new PointsValidationException("A level with inappropriate points for its code.");
                    }
                });

        Level savedLevel = levelRepository.save(modelMapper.map(levelDto, Level.class));
        return modelMapper.map(savedLevel, LevelDto.class);
    }

    @Override
    public List<LevelDto> getAll() {
        List<Level> levels = levelRepository.findAll();
        return levels.stream()
                .map(level -> modelMapper.map(level, LevelDto.class))
                .toList();
    }

    @Override
    public LevelDto update(Integer integer, LevelDto levelDto) {
        Level existingLevel = levelRepository.findById(integer)
                .orElseThrow(() -> new ResourceNotFoundException("The level with ID " + integer + " does not exist"));
        if (levelDto.getPoints() < existingLevel.getPoints()) {
            throw new PointsValidationException("A level cannot have fewer points than its current value.");
        }
        existingLevel.setDescription(levelDto.getDescription());
        existingLevel.setPoints(levelDto.getPoints());
        Level updatedLevel = levelRepository.save(existingLevel);
        return modelMapper.map(updatedLevel, LevelDto.class);
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

        return modelMapper.map(level, LevelDto.class);
    }
}
