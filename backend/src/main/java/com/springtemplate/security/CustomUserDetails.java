package com.springtemplate.security;

import java.util.Collection;
import java.util.List;

import com.springtemplate.domains.auth.Role;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.springtemplate.domains.user.entity.User;

import lombok.RequiredArgsConstructor;


@Getter
public class CustomUserDetails implements UserDetails{
		
	//인증 정보 필드
	private final Long id;
	private final String email;
	private final String password;
	private Role role;
	private final Collection<? extends GrantedAuthority> authorities;
	
	
	public CustomUserDetails(User user) {
		this.id = user.getId();
		this.email = user.getEmail();
		this.password = user.getPw();
		this.authorities = List.of(
				new SimpleGrantedAuthority("ROLE_"+user.getRole().name()) //문자열 객체로 전환하기 위해 name() 사용
		);
		this.role = user.getRole();
		
		
	}
	
	

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return authorities;
	}


	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return email; //이메일을 username으로 사용
	}

	
	
	
	
}
