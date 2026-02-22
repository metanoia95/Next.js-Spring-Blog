package com.springtemplate.domains.blog.dto.comment;

import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
@Builder
public class CommentsResDto {
	
    private Long id;

    private Long authorId;

    private String text;

    @JsonProperty("created_at")
    private OffsetDateTime createdAt;

}
