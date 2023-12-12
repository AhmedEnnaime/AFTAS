package com.youcode.aftas_backend.services.Impl;

import com.youcode.aftas_backend.exceptions.PointsValidationException;
import com.youcode.aftas_backend.exceptions.ResourceNotFoundException;
import com.youcode.aftas_backend.models.dto.LevelDto;
import com.youcode.aftas_backend.models.entities.Level;
import com.youcode.aftas_backend.repositories.LevelRepository;
import com.youcode.aftas_backend.services.LevelService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LevelServiceImpl implements LevelService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private LevelRepository levelRepository;

    @Override
    public LevelDto save(LevelDto levelDto) {
        Optional<Level> maxCodeLevelOpt = levelRepository.findTopByCodeLessThanOrderByCodeDesc(levelDto.getCode());
        if (maxCodeLevelOpt.isPresent()) {
            Level maxCodeLevel = maxCodeLevelOpt.get();
            if (maxCodeLevel.getPoints() >= levelDto.getPoints()) {
                throw new PointsValidationException("A level with a lower code cannot have more points.");
            }
        }
        Level newLevel = modelMapper.map(levelDto, Level.class);
        Level savedLevel = levelRepository.save(newLevel);

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
