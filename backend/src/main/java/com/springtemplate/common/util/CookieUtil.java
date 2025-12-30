package com.springtemplate.common.util;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseCookie;
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
	public void  setTokenCookie(String tokenName, String token, HttpServletResponse response) {
		int maxAge;

		if (tokenName.equals("accessToken")) {
			maxAge = (int) (jwtUtil.EXPIRATION_TIME / 1000); // 클라이언트에서 15분 유지
		} else {
			maxAge = (int) (jwtUtil.REFRESH_EXPIRATION_TIME / 1000); // 클라이언트에서 7일 유지. !! 서버 측이 아님. 서버측은
		}

		ResponseCookie cookie = ResponseCookie.from(tokenName, token)
				.httpOnly(true)
				.secure(true)
				.sameSite("Lax")
				.path("/")
				.maxAge(maxAge)
				.build();

		response.addHeader("Set-Cookie", cookie.toString());

	}
	
	// 쿠키 삭제
	public void deleteTokenCookie(String tokenName, HttpServletResponse response) {

		ResponseCookie cookie = ResponseCookie.from(tokenName, "")
				.httpOnly(true)
				.secure(true)
				.sameSite("None")
				.path("/")
				.maxAge(0)
				.build();

		response.addHeader("Set-Cookie", cookie.toString());
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
