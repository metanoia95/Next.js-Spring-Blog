package com.springtemplate.domains.user.entity;

import java.sql.Date;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Entity
@Table(name="users")
public class User {
	
	//인덱스
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 아이디 자동 증가 설정
	private Long id;
	
	// 이메일
	private String email;

	// 패스워드
	private String pw;

	// 이름
	private String name;

	// 상태 메시지
	private String status_msg;

	// 프로필 사진
	private String profile_img;

	// 가입 일자
	// 생성일자 : sql은 TimeStamp를 사용하지만 엔터티는 LocalDateTime을 사용할 것.
    @CreationTimestamp
	private LocalDateTime created_at;
    
    // 수정 일자
    @UpdateTimestamp
	private LocalDateTime updated_at;
    
    // 리프레시 토큰
    @Column(name = "refresh_token")
    private String refreshToken;
    
    
    // 빌더
    @Builder
    public User(String email, String pw, String name, String status_msg, String profile_img){
    	
    	this.email = email;
    	this.pw = pw;
    	this.name = name;
    	this.status_msg = status_msg;
    	this.profile_img = profile_img;
    	
    }
    
    
}
