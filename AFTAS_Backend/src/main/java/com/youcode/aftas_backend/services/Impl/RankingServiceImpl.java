package com.youcode.aftas_backend.services.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.youcode.aftas_backend.models.dto.RankingDto;
import com.youcode.aftas_backend.services.RankingService;

import lombok.AllArgsConstructor;

@AllArgsConstructor

@Service
public class RankingServiceImpl implements RankingService {

    private final RankingService rankingService;

    @Override
    public RankingDto save(RankingDto dto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }

    @Override
    public List<RankingDto> getAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAll'");
    }

    @Override
    public RankingDto update(Integer identifier, RankingDto dto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public void delete(Integer identifier) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

    @Override
    public RankingDto findByID(Integer identifier) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByID'");
    }
    
}
