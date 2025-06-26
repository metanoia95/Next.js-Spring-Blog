package com.springtemplate.domains.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springtemplate.domains.user.dto.UserInfoResDto;
import com.springtemplate.security.CustomUserDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
	
	//유저 정보 불러오기 
	@GetMapping("/userinfo")
	public ResponseEntity<?> getMyInfo(Authentication authentication) {
		// Authentication authentication 스프링 시큐리티 인증객체.
		CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();
		
		//User 인덱스
		Long id = user.getId();
		
		UserInfoResDto dto = userService.getUserInfobyId(id);
		
		return ResponseEntity.ok(dto);
	}
	
	
}
