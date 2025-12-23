package com.springtemplate.domains.blog.dto.post.res;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
@Builder
public class PostListDto {
	
	private Long id;
	
	private String title;
	
	private LocalDateTime created_at;
	
}
