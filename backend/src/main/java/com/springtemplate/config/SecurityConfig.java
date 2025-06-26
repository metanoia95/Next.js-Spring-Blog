package com.springtemplate.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.springtemplate.security.JwtAuthFilter;

import lombok.RequiredArgsConstructor;


@Configuration // 스프링 bean 등록
@EnableWebSecurity // ** 스프링 시큐리티 어노테이션 *필수*
@RequiredArgsConstructor
public class SecurityConfig {
	
	
	private final JwtAuthFilter jwtAuthFilter;
	
	@Bean // SecurityFilterChain의 보안 필터 체인을 정의
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http
		.cors(Customizer.withDefaults()) // 시큐리티에 WebConfig에서 설정한 CORS 설정 추가
		.csrf(csrf -> csrf.disable()) // 기본 보호기능 비활성화 -> 개발중에만
	    .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션을 무상태로 : JWT 사용 시.
 		.authorizeHttpRequests(auth -> auth
				// requestMatchers는 리퀘스트매핑 값의 경로와 동일하게 설정함. 
				// .requestMatchers("/admin/**").hasRole("ADMIN") - 어드민 요청 설정.
				.requestMatchers("/api/user/**").authenticated()// /user/로 시작하는 모든 경로는 **로그인(인증된 사용자)만 접근 가능.
				.anyRequest().permitAll()  // 그 외 요청은 누구나 접근가능

 				)
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
		//UsernamePasswordAuthenticationFilter.class 앞에 jwtAuthFilter를 적용함. 

		return http.build();
	}
	
	
	@Bean //패스워드 인코더
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
		
	}

}
