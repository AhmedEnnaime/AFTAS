package com.youcode.aftas_backend.services.Impl;

import com.youcode.aftas_backend.configuration.MapperConfig;
import com.youcode.aftas_backend.exceptions.ResourceNotFoundException;
import com.youcode.aftas_backend.models.dto.LevelDto;
import com.youcode.aftas_backend.models.dto.fish.FishDto;
import com.youcode.aftas_backend.models.entities.Fish;
import com.youcode.aftas_backend.models.entities.Level;
import com.youcode.aftas_backend.repositories.FishRepository;
import com.youcode.aftas_backend.services.FishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FishServiceImpl implements FishService {

    @Autowired
    private MapperConfig mapperConfig;

    @Autowired
    private FishRepository fishRepository;

    @Override
    public FishDto save(FishDto fishDto) {
        return null;
    }

    @Override
    public List<FishDto> getAll() {
        List<Fish> fishes = fishRepository.findAll();
        return fishes.stream()
                .map(fish -> mapperConfig.modelMapper().map(fish, FishDto.class))
                .toList();
    }

    @Override
    public FishDto update(String s, FishDto fishDto) {
        return null;
    }

    @Override
    public void delete(String s) {
        Fish fish = fishRepository.findById(s).orElseThrow(()
                -> new ResourceNotFoundException("The fish with id " + s + " does not exist"));
        fishRepository.delete(fish);
    }

    @Override
    public FishDto findByID(String s) {
        Fish fish = fishRepository.findById(s)
                .orElseThrow(() -> new ResourceNotFoundException("The fish with ID " + s + " does not exist"));

        return mapperConfig.modelMapper().map(fish, FishDto.class);
    }

}
