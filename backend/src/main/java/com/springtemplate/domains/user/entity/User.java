package com.springtemplate.domains.user.entity;

import java.sql.Date;
import java.time.LocalDateTime;

import com.springtemplate.domains.auth.Role;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.springtemplate.domains.auth.dto.LoginResDto.LoginResDtoBuilder;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Entity
@Table(name="users")
@Builder
@AllArgsConstructor
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
	@Column(name = "user_name")
	private String userName;

	// 상태 메시지
	@Column(name = "status_msg")
	private String statusMsg;

	// 프로필 사진
	@Column(name = "profile_img")
	private String profileImg;
	
	// 구글 계정정보 
	private String sub;

	// 가입 일자
	// 생성일자 : sql은 TimeStamp를 사용하지만 엔터티는 LocalDateTime을 사용할 것.
    @CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;
    
    // 수정 일자
    @UpdateTimestamp
	@Column(name = "updated_at")
	private LocalDateTime updatedAt;
    
    // 리프레시 토큰
    @Column(name = "refresh_token")
    private String refreshToken;

	//권한
	@Enumerated(EnumType.STRING)
	@Column(name = "role")
	private Role role;

    public User(String email, String pw, String name, String status_msg, String profile_img){
    	
    	this.email = email;
    	this.pw = pw;
    	this.userName = name;
    	this.statusMsg = status_msg;
    	this.profileImg = profile_img;
    	
    }
    
    
}
