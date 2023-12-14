package com.youcode.aftas_backend.services.Impl;

import com.youcode.aftas_backend.exceptions.PointsValidationException;
import com.youcode.aftas_backend.exceptions.ResourceNotFoundException;
import com.youcode.aftas_backend.models.dto.LevelDto;
import com.youcode.aftas_backend.models.entities.Level;
import com.youcode.aftas_backend.repositories.LevelRepository;
import com.youcode.aftas_backend.services.LevelService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
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

        minCodeLevelOpt.ifPresent(minCodeLevel -> {
            if (minCodeLevel.getPoints() >= levelDto.getPoints()) {
                throw new PointsValidationException("A level with inappropriate points for its code.");
            }
        });

        maxCodeLevelOpt.ifPresent(maxCodeLevel -> {
            if (maxCodeLevel.getPoints() <= levelDto.getPoints()) {
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
    public LevelDto update(Integer id, LevelDto updatedLevelDto) {
        Level existingLevel = levelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("The level with ID " + id + " does not exist"));

        if (!existingLevel.getCode().equals(updatedLevelDto.getCode())) {
            throw new IllegalArgumentException("Cannot change the code of the level during update.");
        }
        Optional<Level> minCodeLevelOpt = levelRepository.findTopByCodeLessThanOrderByCodeDesc(existingLevel.getCode());
        Optional<Level> maxCodeLevelOpt = levelRepository.findTopByCodeGreaterThanOrderByCodeAsc(existingLevel.getCode());

        Stream.of(minCodeLevelOpt, maxCodeLevelOpt)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .forEach(level -> {
                    if ((level == minCodeLevelOpt.get() && level.getPoints() >= updatedLevelDto.getPoints()) ||
                            (level == maxCodeLevelOpt.get() && level.getPoints() <= updatedLevelDto.getPoints())) {
                        throw new PointsValidationException("A level with inappropriate points for its code.");
                    }
                });
        existingLevel.setDescription(updatedLevelDto.getDescription());
        existingLevel.setPoints(updatedLevelDto.getPoints());

        Level savedLevel = levelRepository.save(existingLevel);
        return modelMapper.map(savedLevel, LevelDto.class);
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
