package com.springtemplate.domains.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class UserInfoResDto {
	
	private Long id;
	
	private String email;
	
	private String name;
	
	private String status_msg;

	private String profile_img;

}
