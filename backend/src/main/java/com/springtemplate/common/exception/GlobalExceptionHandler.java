package com.springtemplate.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import lombok.extern.slf4j.Slf4j;

//전역 예외처리 핸들러
// ControllerAdvice -> 모든 컨트롤러의 예외를 가로채서 처리.
@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

	@ExceptionHandler(Exception.class)
	public ResponseEntity<String> handleAllExceptions(Exception ex) {
		return new ResponseEntity<>("서버 오류가 발생했습니다: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	}

	
	// 로그인 실패 예외처리
	@ExceptionHandler(LoginFailException.class)
	public ResponseEntity<String> handleLoginFailException(LoginFailException ex) {
		log.warn("[LoginFail] {}", ex.getMessage());
		
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(ex.getMessage());
	}
	
}
