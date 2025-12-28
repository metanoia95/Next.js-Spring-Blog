package com.springtemplate.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.springtemplate.common.util.CookieUtil;
import com.springtemplate.common.util.JwtUtil;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Component
@Slf4j
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
		String token = null;

		//AuthorizationHeader 추출(SSR)
		String authHeader = request.getHeader("Authorization");
		if(authHeader != null && authHeader.startsWith("Bearer")){
			token = authHeader.substring(7); // Bearer 문자열 제외
		}
		log.debug(token);

		// 헤더에 토큰이 없는 경우(CSR)
		if(token == null ){
			token = cookieUtil.resolveAccessTokenFromCookie(request);
		};

		final String uri = request.getRequestURI();
		
		// 1) 프리플라이트는 통과
	    if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
	      log.debug("JWT FILTER: bypass OPTIONS {}", uri);
	      filterChain.doFilter(request, response);
	      return;
	    }

	    // 2) 공개 경로는 통과 (signup/login/refresh 등)
//	    if (uri.startsWith("/api/auth/")) {
//	      log.debug("JWT FILTER: bypass public {}", uri);
//	      filterChain.doFilter(request, response);
//	      return;
//	    }
//
		
		try {
		// 토큰 검증
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
			log.info("authToken principal type = {}", authToken.getPrincipal().getClass().getName());

			// 인증 정보를 SecurityContext에 저장. 필터나 컨트롤러에서 사용자를 여기서 꺼내서 사용함. 
			SecurityContextHolder.getContext().setAuthentication(authToken);
			
			/*  인증 객체 사용방법
			 *
			 		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
					CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
					Long user_id = userDetails.getId();
			 * 
			 *  */
			
			
		}
		}catch(ExpiredJwtException e){
		      log.error("JWT FILTER: error at {} msg={}", uri, e.getMessage());
				
		}
		
		filterChain.doFilter(request, response);
	}
	
	
	
	

}
