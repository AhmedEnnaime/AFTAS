package com.youcode.aftas_backend.services;

import com.youcode.aftas_backend.models.dto.hunting.SingleHuntDto;
import com.youcode.aftas_backend.models.dto.hunting.huntingDto;

import java.util.List;

public interface HuntingService {
    SingleHuntDto createHunt(huntingDto hunting);

    List<SingleHuntDto> createHuntBatch(List<huntingDto> hunts);

    SingleHuntDto getHuntById(int id);

    List<SingleHuntDto> getHunts();

    void deleteById(int id);

    SingleHuntDto updateNumberOfFish(int id, int valueToAdd);
}
