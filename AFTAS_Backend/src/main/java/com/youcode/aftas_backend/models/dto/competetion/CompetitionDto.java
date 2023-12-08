package com.youcode.aftas_backend.models.dto.competetion;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.youcode.aftas_backend.models.dto.RankingDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class CompetitionDto {

    private String code;
    private LocalDate date;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer numberOfParticipants;
    private String location;
    private Double amount;
    private List<RankingDto> rankings;
}
