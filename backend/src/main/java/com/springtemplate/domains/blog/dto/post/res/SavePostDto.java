package com.springtemplate.domains.blog.dto.post.res;


import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class SavePostDto {
	
	private Long id;
	
	private String title;
	
	private String page_json;
	
	private String page_html;
	
	
}
