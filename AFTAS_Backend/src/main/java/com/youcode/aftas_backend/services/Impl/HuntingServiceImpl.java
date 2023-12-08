package com.youcode.aftas_backend.services.Impl;

import com.youcode.aftas_backend.repositories.HuntingRepository;
import com.youcode.aftas_backend.services.FishService;
import com.youcode.aftas_backend.services.HuntingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HuntingServiceImpl implements HuntingService {
    @Autowired
    private HuntingRepository huntingRepository;
}
