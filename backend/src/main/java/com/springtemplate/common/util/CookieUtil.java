package com.springtemplate.common.util;

import org.springframework.stereotype.Component;

import com.springtemplate.domains.user.repository.UserRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

// 쿠키 관련 유틸 모음.
@Component
@RequiredArgsConstructor
public class CookieUtil {

	private final JwtUtil jwtUtil;

	// 쿠키 세팅
	public Cookie setTokenCookie(String tokenName, String token) {
		Cookie tokenCookie = new Cookie(tokenName, token);
		tokenCookie.setHttpOnly(true); // 자바스크립트에서 접근 불가.
		tokenCookie.setSecure(false); // 로컬 개발 환경에서는 false로 설정. -> true로 설정 시 https 환경에서만 전송 가능
		tokenCookie.setPath("/");

		if (tokenName.equals("accessToken")) {
			tokenCookie.setMaxAge((int) (jwtUtil.EXPIRATION_TIME / 1000)); // 클라이언트에서 15분 유지
		} else {
			tokenCookie.setMaxAge((int) (jwtUtil.REFRESH_EXPIRATION_TIME / 1000)); // 클라이언트에서 7일 유지. !! 서버 측이 아님. 서버측은
																					// jwtUtil에 있음.
		}

		return tokenCookie;

	}
	
	// 쿠키 삭제
	public Cookie deleteTokenCookie(String tokenName) {
		
		Cookie cookie = new Cookie(tokenName, null);
		cookie.setHttpOnly(true); // 자바스크립트에서 접근 불가. xss 공격 방지
		cookie.setSecure(false); // 로컬 개발 환경에서는 false로 설정.
		cookie.setPath("/");
		cookie.setMaxAge(0); // 즉시 만료
		
		return cookie;
	}

	// 쿠키에서 액세스 토큰 추출
	public String resolveAccessTokenFromCookie(HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if ("accessToken".equals(cookie.getName())) {
					return cookie.getValue();
				}

			}

		}
		return null;

	}

	// 쿠키에서 리프레시 토큰 추출
	public String resolveRefreshTokenFromCookie(HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if ("refreshToken".equals(cookie.getName())) {
					return cookie.getValue();
				}

			}

		}
		return null;

	}

}
