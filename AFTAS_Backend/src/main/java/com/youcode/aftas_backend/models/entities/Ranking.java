package com.youcode.aftas_backend.models.entities;

import com.youcode.aftas_backend.models.embeddables.CompetitionMember;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
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
    private Integer score;

    @NotNull(message = "ranking competition is required.")
    @ManyToOne
    @MapsId("competition_code")
    private Competition competition;

    @NotNull(message = "ranking member is required.")
    @ManyToOne()
    @MapsId("member_num")
    private Member member;
}
