package com.youcode.aftas_backend.services;

import com.youcode.aftas_backend.models.dto.LevelDto;
import com.youcode.aftas_backend.superClasses.ServiceInterface;
import org.springframework.stereotype.Repository;

@Repository
public interface LevelService extends ServiceInterface<LevelDto, Long> {
}
