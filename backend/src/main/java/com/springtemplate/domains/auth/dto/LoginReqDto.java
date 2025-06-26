package com.springtemplate.domains.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.springtemplate.domains.user.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class LoginReqDto {

	// 이메일
	private String email;

	// 패스워드 
	@JsonProperty("password") // 프론트엔드 필드값 맞춰줌.
	private String pw;
	

	@Builder
	public LoginReqDto(String email, String pw) {
		this.email = email;
		this.pw = pw;
		
	}
	
	
	public User toEntity() {
	    return User.builder()
	            .email(this.email)
	            .pw(this.pw)
	            .name("") // 로그인할 때는 이름 정보 없으니 기본값 빈 문자열
	            .status_msg("")
	            .profile_img("")
	            .build();
	}
	
}
