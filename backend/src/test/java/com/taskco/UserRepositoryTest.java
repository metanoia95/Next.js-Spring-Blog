package com.taskco;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.springtemplate.domains.user.entity.User;
import com.springtemplate.domains.user.repository.UserRepository;

@SpringBootTest
public class UserRepositoryTest {
	
	// 테스트 코드에서는 필드 주입방식 사용
	// 본 코드로 옮기면 생성자 주입 해줄 것.
	@Autowired
	private UserRepository userRepository;
	
	
	@Test 
	void UserInfoInsertTest() {
		
		
		User user =  User.builder()
				.email("Test@email.com")
				.pw("12345")
				.status_msg("")
				.profile_img(null)
				.build();
		
		userRepository.save(user);
        userRepository.flush();  

	}
	
}
