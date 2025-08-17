package com.springtemplate.domains.auth.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.springtemplate.domains.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder // 빌더
@AllArgsConstructor //필드명 전체가 담긴 생성자
@ToString
public class SignUpReqDto {
	

	private String email;
	
	@JsonProperty("password")
	private String pw;
	
	
	private String name;
	
	
	public User toEntity(String encryptedPassword){
		return User.builder()
				.email(this.email)
				.pw(encryptedPassword)
				.user_name(this.name)
				.build();
		
		
	}

	
}
