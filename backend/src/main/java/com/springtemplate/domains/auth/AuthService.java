package com.springtemplate.domains.auth;

import java.util.Optional;
import java.util.UUID;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springtemplate.common.exception.LoginFailException;
import com.springtemplate.common.util.CookieUtil;
import com.springtemplate.common.util.JwtUtil;
import com.springtemplate.domains.auth.dto.GoogleLoginReqDto;
import com.springtemplate.domains.auth.dto.LoginReqDto;
import com.springtemplate.domains.auth.dto.LoginResDto;
import com.springtemplate.domains.auth.dto.SignUpReqDto;
import com.springtemplate.domains.user.entity.User;
import com.springtemplate.domains.user.repository.UserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

	private final JwtUtil jwtUtil;
	private final CookieUtil cookieUtil;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	// 로그인 로직
	/*
	 * 25.04.27 엔터티와 dto 분리 서비스 단으로 주입되는 객체는 dto 객체를 주입해야함.
	 */
	@Transactional
	public LoginResDto login(LoginReqDto reqDto, HttpServletResponse response) {

		User user = userRepository.findByEmail(reqDto.getEmail())
				.orElseThrow(() -> new LoginFailException("이메일이 없습니다"));

		if (!passwordEncoder.matches(reqDto.getPw(), user.getPw())) {
			throw new LoginFailException("비밀번호가 일치하지 않습니다");
		}

		return createLoginResDto(user, response); // 로그인 성공
	}

	// 회원가입 로직
	@Transactional
	public LoginResDto signUp(SignUpReqDto reqDto) {

		// 1. 이메일 중복체크
		if (userRepository.existsByEmail(reqDto.getEmail())) {
			throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
		}

		// 비밀번호 암호화
		String encryptedPassword = passwordEncoder.encode(reqDto.getPw());

		// 엔터티 변환
		User user = reqDto.toEntity(encryptedPassword);

		userRepository.save(user);

		LoginResDto resDto = LoginResDto.builder().build();

		return resDto; // 로그인 성공

	}

	// 로그아웃 로직
	@Transactional
	public void logOutUser(HttpServletRequest request, HttpServletResponse response) {

		response.addCookie(cookieUtil.deleteTokenCookie("accessToken"));
		response.addCookie(cookieUtil.deleteTokenCookie("refreshToken"));
		String refreshToken = cookieUtil.resolveRefreshTokenFromCookie(request);
		userRepository.clearRefreshToken(refreshToken);

	}

	// 토큰 리프레시 로직
	@Transactional
	public void refreshAccessToken(HttpServletRequest request, HttpServletResponse response) {

		// 1. 리프레시 토큰 추출
		String refreshToken = cookieUtil.resolveRefreshTokenFromCookie(request);
		// System.out.println("refreshToken : "+refreshToken);
		if (refreshToken == null || !jwtUtil.validateRefreshToken(refreshToken)) {
			response.addCookie(cookieUtil.deleteTokenCookie("accessToken"));
			response.addCookie(cookieUtil.deleteTokenCookie("refreshToken"));
			throw new BadCredentialsException("유효하지 않은 리프레시 토큰입니다");
		}

		// 2. DB에서 정보 추출
		User user = userRepository.getByRefreshToken(refreshToken);
		if (user == null) {
			response.addCookie(cookieUtil.deleteTokenCookie("accessToken"));
			response.addCookie(cookieUtil.deleteTokenCookie("refreshToken"));
			throw new BadCredentialsException("리프레시 토큰과 일치하는 사용자을 찾을 수 없습니다.");

		}

		String newAccessToken = jwtUtil.generateAccessToken(user.getEmail()); // 이메일 값으로 액세스 토큰 생성
		response.addCookie(cookieUtil.setTokenCookie("accessToken", newAccessToken));

	}
	
	//구글 로그인
	@Transactional
	public LoginResDto googleLogin(GoogleLoginReqDto dto, HttpServletResponse response) {
		
		String sub = dto.getSub();
		
		User user = userRepository.findBySub(sub)
				.map(u->{ // user가 있으면 실행. 기존 유저 필드만 갱신
					u.setEmail(dto.getEmail());
					u.setUser_name(dto.getName());
					return u;
				})
				.orElseGet(() ->  // 신규유저					
					// 유저정보 업데이트 및 가입 처리
					User.builder()
						.sub(dto.getSub())
						.email(dto.getEmail())
						.user_name(dto.getName())
						.build()
				);

		
		userRepository.save(user);
		
		return createLoginResDto(user, response);
	
	}
	
	
	
	// 참조 함수
	private LoginResDto createLoginResDto (User user, HttpServletResponse response) {
		String accessToken = addAcRfTokenToCookie(user, response);
		LoginResDto resDto = LoginResDto.builder().accessToken(accessToken).build();
		return resDto;
	}

	private String addAcRfTokenToCookie(User user, HttpServletResponse response) {

		// JWT 토큰 생성
		// 액세스 토큰과 리프레시 토큰을 둘다 생성
		String accessToken = jwtUtil.generateAccessToken(user.getEmail()); // 이메일 값으로 액세스 토큰 생성

		// 서블릿에 쿠키추가
		response.addCookie(cookieUtil.setTokenCookie("accessToken", accessToken));

		// 리프레시토큰용 uuid 생성
		UUID uuid = UUID.randomUUID(); // 128bit uuid 생성
		String refreshToken = jwtUtil.generateRefreshToken(uuid.toString()); //

		user.setRefreshToken(refreshToken);
		userRepository.save(user); // 리프레시 토큰을 user 객체에 넣어서 저장.
		// 25.05.18 -> 차후에 커스텀 쿼리로 리팩토링하거나 redis로 전환?

		// 서블릿에 쿠키 추가
		response.addCookie(cookieUtil.setTokenCookie("refreshToken", refreshToken));

		return accessToken;
	}

}
