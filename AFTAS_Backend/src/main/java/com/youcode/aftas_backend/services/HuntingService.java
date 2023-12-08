package com.youcode.aftas_backend.services;

import com.youcode.aftas_backend.models.dto.hunting.SingleHuntDto;
import com.youcode.aftas_backend.models.dto.hunting.HuntingDto;

import java.util.List;

public interface HuntingService {
    SingleHuntDto createHunt(HuntingDto hunting);

    List<SingleHuntDto> createHuntBatch(List<HuntingDto> hunts);

    SingleHuntDto getHuntById(int id);

    List<SingleHuntDto> getHunts();

    void deleteById(int id);

    SingleHuntDto updateNumberOfFish(int id, int valueToAdd);

    List<SingleHuntDto> findHuntByCompetitionAndMember(String code, int num);
}
