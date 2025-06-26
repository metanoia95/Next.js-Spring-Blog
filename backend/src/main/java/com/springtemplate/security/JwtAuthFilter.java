package com.springtemplate.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.springtemplate.common.util.CookieUtil;
import com.springtemplate.common.util.JwtUtil;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
	// jwtAuthFilter는 액세스 토큰만 신경쓰고 리프레시 토큰은 다루지 않음. 
	
	
	private final JwtUtil jwtUtil;
	private final CookieUtil cookieUtil;
	private final CustomUserDetailService userDetailService;
	
	@Override
	protected void doFilterInternal(
			HttpServletRequest request,
			HttpServletResponse response,
			FilterChain filterChain
			)
			throws ServletException, IOException {
		
		
		try {
		// Jwt처리 로직
		// 1. 쿠키에서 액세스 토큰 추출
		String token = cookieUtil.resolveAccessTokenFromCookie(request); 
		
		// 2. 토큰 검증
		if(token !=null && jwtUtil.validateAccessToken(token)) {
		
			String email = jwtUtil.extractUserEmail(token);
			
			// UserDetails 인증된 사용자 정보를 담는 Spring Security의 표준 인터페이스
			// getUsername() 등 여러 메서드가 있음. 
			// User테이블의 엔터티와 연결해야 할 경우 별도의 커스텀 클래스를 만들어야함. 
			// 커스터마이징 할 것이라면 UserDetailService를 상속받는 새로운 클래스를 만들 것.
			CustomUserDetails userDetails = (CustomUserDetails) userDetailService.loadUserByUsername(email);
			
			//UsernamePasswordAuthenticationToken 스프링 시큐리티의 보안 컨텍스트에서만 사용 하는 인증 정보 객체.
			// 인증토큰 발급(스프링 내에서만 활용)
			UsernamePasswordAuthenticationToken authToken = 
					new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
			
			// 인증 정보를 SecurityContext에 저장. 필터나 컨트롤러에서 사용자를 여기서 꺼내서 사용함. 
			SecurityContextHolder.getContext().setAuthentication(authToken);
			
		}
		}catch(ExpiredJwtException e){
			
			
		}
		
		filterChain.doFilter(request, response);
	}
	
	
	
	

}
