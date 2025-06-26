package com.springtemplate.domains.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.springtemplate.domains.user.entity.User;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	// Optional로 null처리
	// 비밀번호 검증은 service 레이어에서 함. 
	Optional<User> findByEmail(String email);
	
	// 이메일 존재여부 확인
	boolean existsByEmail(String email);
	
	// 인덱스로 유저정보 불러오기
	User getById(Long id);
	
	//리프레시 토큰으로 유저정보 불러오기
	User getByRefreshToken(String refreshToken);

	// 리프레시 토큰 삭제
	@Modifying //Select문이 아닌 insert, update, delete인 경우 붙여줘야함.
	@Query("UPDATE User u SET u.refreshToken=null where u.refreshToken = :refreshToken") //@Query의 경우 엔터티의 컬럼명과 맞출 것. 
	int clearRefreshToken(@Param("refreshToken") String refreshToken);
}
