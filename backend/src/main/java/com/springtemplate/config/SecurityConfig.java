package com.springtemplate.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.springtemplate.domains.auth.AuthService;
import com.springtemplate.security.JwtAuthFilter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Configuration // 스프링 bean 등록
@EnableWebSecurity // ** 스프링 시큐리티 어노테이션 *필수*
@RequiredArgsConstructor
@Slf4j
public class SecurityConfig {
	
	
	private final JwtAuthFilter jwtAuthFilter;
	
	@Bean // SecurityFilterChain의 보안 필터 체인을 정의
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http
		.cors(Customizer.withDefaults()) // 시큐리티에 WebConfig에서 설정한 CORS 설정 추가
		.csrf(csrf -> csrf.disable()) // 기본 보호기능 비활성화 -> 개발중에만
	    .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션을 무상태로 : JWT 사용 시.
 		.authorizeHttpRequests(auth -> auth
 				.requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll() // Options 요청은 허가.requestMatchers("/api/auth/logout").authenticated()
				.requestMatchers("/api/auth/**").permitAll()
				.requestMatchers(HttpMethod.GET, "/api/blog/**").permitAll()
				.anyRequest().authenticated()
 				).exceptionHandling(ex -> ex                           // 401/403 원인 로깅(선택)
 					    .authenticationEntryPoint((req,res,e) -> { res.setStatus(401);log.info("Sec : authenticationEntryPoint 401 {}", req.getHeader("Origin")); })
						.accessDeniedHandler((req,res,e) -> { res.setStatus(403); log.info("Security : accessDeniedHandler 403 {}", req.getHeader("Origin"));})
 					    )
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}
	
	
	@Bean //패스워드 인코더
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
		
	}

}
