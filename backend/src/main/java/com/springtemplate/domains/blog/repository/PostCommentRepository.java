package com.springtemplate.domains.blog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springtemplate.domains.blog.entity.PostComment;

import java.util.List;

@Repository
public interface PostCommentRepository extends JpaRepository<PostComment, Long> {
    List<PostComment> id(Long id);

    List<PostComment> findAllByPostId(Long postId);
}