package com.springtemplate.domains.auth.dto.req;

public record LogoutReq(
        String refreshToken
) {
}
