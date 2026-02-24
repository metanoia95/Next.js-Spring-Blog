package com.springtemplate.domains.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
public record LoginResDto(
        
        String accessToken,
        String refreshToken,
        Long userId,
        String email

) {


}
