package com.springtemplate.domains.auth.dto;

public record MeDto(
        Long id, //id
        String email,
        String role
) { }
