package com.youcode.aftas_backend.services;

import com.youcode.aftas_backend.models.dto.fish.FishDto;
import com.youcode.aftas_backend.models.dto.fish.FishDtoResponse;

import java.util.List;

public interface FishService {

    FishDto save(FishDto levelDto);

    void delete(String id);

    List<FishDtoResponse> getAll();

    FishDtoResponse findByID(String id);

    FishDto update(String id, FishDto levelDto);
}
