package com.springtemplate.domains.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springtemplate.domains.auth.dto.LoginReqDto;
import com.springtemplate.domains.auth.dto.LoginResDto;
import com.springtemplate.domains.auth.dto.SignUpReqDto;
import com.springtemplate.mapper.UserMapper;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final UserMapper mapper;
	private final AuthService authService;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginReqDto user, HttpServletResponse response) {

		LoginResDto resDto = authService.login(user, response);

		return ResponseEntity.ok(resDto);

	}

	@PostMapping("/signup")
	public ResponseEntity<?> signUpUser(@RequestBody SignUpReqDto dto, HttpServletResponse res) {

		LoginResDto resDto = authService.signUp(dto);
		return ResponseEntity.ok(resDto);

	}

	// 로그아웃
	@PostMapping("/logout")
	public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {

		authService.logOutUser(request ,response);

		return ResponseEntity.ok("Logged out success");

	}

	@PostMapping("/refresh")
	public ResponseEntity<?> refreshAccessToken(HttpServletRequest request, HttpServletResponse response) {

		authService.refreshAccessToken(request, response);

		return ResponseEntity.ok().build();
	}

}
