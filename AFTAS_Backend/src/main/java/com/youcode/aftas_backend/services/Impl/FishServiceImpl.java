package com.youcode.aftas_backend.services.Impl;

import com.youcode.aftas_backend.exceptions.ResourceNotFoundException;
import com.youcode.aftas_backend.models.dto.fish.FishDto;
import com.youcode.aftas_backend.models.dto.fish.FishDtoResponse;
import com.youcode.aftas_backend.models.entities.Fish;
import com.youcode.aftas_backend.models.entities.Level;
import com.youcode.aftas_backend.repositories.FishRepository;
import com.youcode.aftas_backend.repositories.LevelRepository;
import com.youcode.aftas_backend.services.FishService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FishServiceImpl implements FishService {

    private ModelMapper modelMapper;

    private FishRepository fishRepository;

    private LevelRepository levelRepository;

    @Override
    public FishDto save(FishDto fishDto) {
        Fish fish = modelMapper.map(fishDto, Fish.class);
        if (fishDto.getLevel_id() != null) {
            Level level = levelRepository.findById(fishDto.getLevel_id())
                    .orElseThrow(() -> new ResourceNotFoundException("The level with id " + fishDto.getLevel_id() + " is not found"));
            fish.setLevel(level);
        }
        fish = fishRepository.save(fish);
        return modelMapper.map(fish, FishDto.class);
    }

    @Override
    public List<FishDtoResponse> getAll() {
        List<Fish> fishes = fishRepository.findAll();
        return fishes.stream()
                .map(fish -> modelMapper.map(fish, FishDtoResponse.class))
                .toList();
    }

    @Override
    public FishDto update(String s, FishDto fishDto) {
        Fish existingFish = fishRepository.findById(s)
                .orElseThrow(() -> new ResourceNotFoundException("The fish with name " + s + " does not exist"));

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
                -> new ResourceNotFoundException("The fish with name " + s + " does not exist"));
        fishRepository.delete(fish);
    }

    @Override
    public FishDtoResponse findByID(String s) {
        Fish fish = fishRepository.findById(s)
                .orElseThrow(() -> new ResourceNotFoundException("The fish with name " + s + " does not exist"));

        return modelMapper.map(fish, FishDtoResponse.class);
    }

}
