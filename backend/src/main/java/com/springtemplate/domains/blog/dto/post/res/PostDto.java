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
public class PostDto {
	
	private Long id;
	
	private Long authorId; 
	
	private String title;
		
	private String page_html;
	
	private String page_json;
	
	private LocalDateTime created_at;
	
}
