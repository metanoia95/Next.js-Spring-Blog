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

    private String author; // 작성자

    @Column(columnDefinition = "TEXT")
    private  String text; // 댓글 내용

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;



}