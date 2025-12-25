package com.springtemplate.domains.blog.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcType;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="blog_posts")
public class BlogPost {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id; // 인덱스
	
    @Column(name = "author_id")
	private Long authorId;

	@Column(name = "title")
	private String title;
	
	// 페이지 json 파일
	@Column(columnDefinition = "jsonb", name = "page_json")
	@JdbcTypeCode(SqlTypes.JSON)
	private String pageJson;
	
    @Column(columnDefinition = "TEXT", name = "page_html")
	private String pageHtml;
	
	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	    
    // 수정 일자
    @UpdateTimestamp
	@Column(name = "updated_at")
	private LocalDateTime updatedAt;
	
	
	
}
