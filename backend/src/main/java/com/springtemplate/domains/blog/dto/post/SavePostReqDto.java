package com.springtemplate.domains.blog.dto.post;

import com.springtemplate.domains.blog.entity.BlogPost;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class SavePostReqDto {
	
	private Long id;
	
	private String title;
	
	private String page_json;
	
	private String page_html;
	
	
}
