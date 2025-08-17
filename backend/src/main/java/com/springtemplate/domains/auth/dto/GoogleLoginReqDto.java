package com.springtemplate.domains.auth.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class GoogleLoginReqDto {
	
	// 구글 고유번호
	private String sub;
	
	// 이메일
	private String email;
	
	// 이름
	private String name;
	
	
}
