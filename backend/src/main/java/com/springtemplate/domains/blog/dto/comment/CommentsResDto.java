package com.springtemplate.domains.blog.dto.comment;

import java.time.LocalDateTime;

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

    private  String author;

    private String text;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

}
