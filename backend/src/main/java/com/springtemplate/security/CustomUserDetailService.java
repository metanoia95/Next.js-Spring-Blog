package com.springtemplate.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.springtemplate.domains.user.entity.User;
import com.springtemplate.domains.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
	
	private final UserRepository userRepository; 
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(username) // 유저정보를 리포지토리에서 가져오기. 현재 별도 검증로직은 없음. 
				.orElseThrow(()-> new UsernameNotFoundException("사용자를 찾을 수 없습니다"));
		
		return new CustomUserDetails(user);
	}
	
	
	
}
