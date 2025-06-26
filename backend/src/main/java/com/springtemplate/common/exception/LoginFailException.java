package com.springtemplate.common.exception;

public class LoginFailException extends RuntimeException{
	
	public LoginFailException(String message) {
		
		super(message); //RuntimeException(부모)로 message 넘겨줌.
	}
	
}
