package com.youcode.aftas_backend.services.Impl;

import com.youcode.aftas_backend.exceptions.ResourceNotFoundException;
import com.youcode.aftas_backend.models.dto.fish.FishDto;
import com.youcode.aftas_backend.models.entities.Fish;
import com.youcode.aftas_backend.models.entities.Level;
import com.youcode.aftas_backend.repositories.FishRepository;
import com.youcode.aftas_backend.repositories.LevelRepository;
import com.youcode.aftas_backend.services.FishService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FishServiceImpl implements FishService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private FishRepository fishRepository;

    @Autowired
    private LevelRepository levelRepository;

    @Override
    public FishDto save(FishDto fishDto) {
        Fish fishRequest = modelMapper.map(fishDto, Fish.class);
        Fish fish = fishRepository.save(fishRequest);
        return modelMapper.map(fish, FishDto.class);
    }

    @Override
    public List<FishDto> getAll() {
        List<Fish> fishes = fishRepository.findAll();
        return fishes.stream()
                .map(fish -> modelMapper.map(fish, FishDto.class))
                .toList();
    }

    @Override
    public FishDto update(String s, FishDto fishDto) {
        Fish existingFish = fishRepository.findById(s)
                .orElseThrow(() -> new ResourceNotFoundException("The fish with ID " + s + " does not exist"));

        existingFish.setName(fishDto.getName());
        existingFish.setAverageWeight(fishDto.getAverageWeight());
        if (fishDto.getLevel_id() != null) {
            Level level = levelRepository.findById(fishDto.getLevel_id())
                    .orElseThrow(() -> new ResourceNotFoundException("The level with id " + fishDto.getLevel_id() + " is not found"));
            existingFish.setLevel(level);
        }else {
            existingFish.setLevel(null);
        }
        Fish updatedFish = fishRepository.save(existingFish);

        return modelMapper.map(updatedFish, FishDto.class);
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

        return modelMapper.map(fish, FishDto.class);
    }

}
