package com.springtemplate.domains.user;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springtemplate.domains.user.dto.UserInfoResDto;
import com.springtemplate.domains.user.entity.User;
import com.springtemplate.domains.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	
	private final UserRepository userRepository;
	
	// 유저 정보 가져오기 
	@Transactional(readOnly = true)
	public UserInfoResDto getUserInfobyId(Long id) {
		
		User user = userRepository.getById(id);
		
		UserInfoResDto dto = UserInfoResDto.builder()
				.email(user.getEmail())
				.name(user.getUser_name())
				.status_msg(user.getStatus_msg())
				.profile_img(user.getProfile_img())
				.build();
		
		return dto;
	}
	
	
}
