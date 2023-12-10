package com.youcode.aftas_backend.models.entities;

import com.youcode.aftas_backend.models.embeddables.CompetitionMember;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
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

@Entity
@Table(name = "rankings")
public class Ranking {

    @EmbeddedId
    private CompetitionMember id;

    private Integer rank;

    @Column(columnDefinition = "INT DEFAULT 0")
    private Integer score;

    @ManyToOne
    @MapsId("competitionCode")
    private Competition competition;

    @ManyToOne
    @MapsId("memberNum")
    private Member member;
}
