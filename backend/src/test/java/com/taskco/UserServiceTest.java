package com.taskco;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.springtemplate.domains.user.UserService;
import com.springtemplate.domains.user.dto.UserInfoResDto;
import com.springtemplate.domains.user.repository.UserRepository;


// 최상단 메인클래스로 정의. 테스트 패키지는 최상단에 위치해야 하단에 있는 클래스를 불러올 수 있음.
@SpringBootTest(classes = com.springtemplate.SpringTemplateApplication.class)
public class UserServiceTest {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserService userService;
	
	@Test
	@Transactional // Lazy 로딩 문제 해결
	void getUserInfoTest () {
		
		Long id = (long) 1;
		UserInfoResDto user = userService.getUserInfobyId(id);
		
		System.out.println("user email : "+user.getEmail());
		assertNotNull(user);
		
		
	}

}
