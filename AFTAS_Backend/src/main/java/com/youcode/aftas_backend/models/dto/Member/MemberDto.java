package com.youcode.aftas_backend.models.dto.Member;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.youcode.aftas_backend.models.dto.RankingDto;
import com.youcode.aftas_backend.models.dto.user.UserDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberDto extends UserDTO{
    
    @JsonIgnore
    private List<RankingDto> rankings;
}
