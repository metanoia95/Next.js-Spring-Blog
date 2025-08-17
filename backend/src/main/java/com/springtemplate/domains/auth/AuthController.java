package com.springtemplate.domains.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springtemplate.domains.auth.dto.GoogleLoginReqDto;
import com.springtemplate.domains.auth.dto.LoginReqDto;
import com.springtemplate.domains.auth.dto.LoginResDto;
import com.springtemplate.domains.auth.dto.SignUpReqDto;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

	private final AuthService authService;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginReqDto user, HttpServletResponse response) {
		
		log.info("[Login Attemp ]" + user);
		LoginResDto resDto = authService.login(user, response);
		log.info("[Login Success] accessToken:"+resDto.getAccessToken());

		return ResponseEntity.ok(resDto);

	}

	@PostMapping("/signup")
	public ResponseEntity<?> signUpUser(@RequestBody SignUpReqDto dto, HttpServletResponse res) {
		log.info("[Signup Attemp ]" + dto);
		LoginResDto resDto = authService.signUp(dto);
		log.info("[Signup Success] :"+resDto.getAccessToken());

		return ResponseEntity.ok(resDto);

	}

	// 로그아웃
	@PostMapping("/logout")
	public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
		log.info("[Logout Attemp ]" + request.getHeader("access-Token"));
		authService.logOutUser(request ,response);
		
		
		return ResponseEntity.ok("Logged out success");

	}
	
	//액세스 토큰 갱신
	@PostMapping("/refresh")
	public ResponseEntity<?> refreshAccessToken(HttpServletRequest request, HttpServletResponse response) {
		log.info("[Refresh Attemp ]" + request.getHeader("refreshToken"));
		authService.refreshAccessToken(request, response);

		return ResponseEntity.ok().build();
	}
	
	//구글 로그인
	@PostMapping("/login/google")
	public ResponseEntity<?> googleLogin(@RequestBody GoogleLoginReqDto user, HttpServletResponse response) {
		
		log.info("[GoogleLogin Attemp ]" + user);
		LoginResDto resDto = authService.googleLogin(user, response);
		log.info("[GoogleLogin Success] accessToken:"+resDto.getAccessToken());
		log.info(response.getHeader("Set-Cookie"));

		return ResponseEntity.ok(resDto);

	}

}
