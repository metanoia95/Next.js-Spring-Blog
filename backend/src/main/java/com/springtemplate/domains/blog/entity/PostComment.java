package com.springtemplate.domains.blog.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "post_comment")
public class PostComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 인덱스

    @Column(name = "post_id")
    private Long postId; // Fk
    
    @Column(name = "author_id")
    private Long authorId; // 작성자 id

    @Column(columnDefinition = "TEXT", name = "comment_text" )
    private  String text; // 댓글 내용

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;



}