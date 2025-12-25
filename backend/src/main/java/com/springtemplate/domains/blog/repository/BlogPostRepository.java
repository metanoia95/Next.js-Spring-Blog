package com.springtemplate.domains.blog.repository;

import java.util.List;

import com.springtemplate.domains.blog.dto.post.res.PostListDto;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.springtemplate.domains.blog.entity.BlogPost;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long>{

    @Query("""
    SELECT new com.springtemplate.domains.blog.dto.post.res.PostListDto(
        p.id,
        p.title,
        p.createdAt
        )
    FROM BlogPost p
    WHERE (:keyword IS NULL OR p.title Like %:keyword%) 
    ORDER BY p.createdAt Desc
    """)
    Page<PostListDto> findPostList(@Param("keyword") String keyword, Pageable pageable);
	
}
