package com.springtemplate.domains.blog.repository;

import com.springtemplate.domains.blog.dto.post.PostSearchCond;
import com.springtemplate.domains.blog.dto.post.res.PostListDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface PostRepositoryCustom {

    Page<PostListDto> findPostList(PostSearchCond param, Pageable pageable);

}
