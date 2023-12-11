package com.youcode.aftas_backend.models.embeddables;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

@Embeddable
public class CompetitionMember implements Serializable {
    
    @Column(name = "member_num")
    private Integer memberNum;

    @Column(name = "competition_code")
    private String competitionCode;

    @Override 
    public String toString() {
        return "{\n" +
                "\tmemberNum: " + this.memberNum + '\n' +
               "\tcompetitionCode: " + this.competitionCode + '\n'+
                "}";
    }

}
