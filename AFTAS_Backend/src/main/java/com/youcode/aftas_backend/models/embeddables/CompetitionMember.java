package com.youcode.aftas_backend.models.embeddables;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class CompetitionMember {
    
    @Column(name = "member_num", nullable = false)
    private Integer memberNum;

    @Column(name = "competition_code", nullable = false)
    private String competitionCode;

}
