package com.youcode.aftas_backend.models.embeddables;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class CompetitionMember implements Serializable {
    
    @Column(name = "member_num", nullable = false)
    private Integer memberNum;

    @Column(name = "competition_code", nullable = false)
    private String competitionCode;

}
