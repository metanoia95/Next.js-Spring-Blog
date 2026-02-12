package com.springtemplate.domains.blog.repository.impl;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.springtemplate.domains.blog.dto.post.PostSearchCond;
import com.springtemplate.domains.blog.dto.post.res.PostListDto;
import static com.springtemplate.domains.blog.entity.QBlogPost.blogPost;
import com.springtemplate.domains.blog.repository.PostRepositoryCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

@RequiredArgsConstructor
public class PostRepositoryCustomImpl implements PostRepositoryCustom {

    //QueryDSL
    private final JPAQueryFactory query;


    @Override
    public Page<PostListDto> findPostList(PostSearchCond param, Pageable pageable) {

        // 게시글 리스트 조회
        List<PostListDto> list  = query.select(
                Projections.constructor(PostListDto.class
                        , blogPost.id
                        , blogPost.title
                        , blogPost.createdAt
                ))
        .from(blogPost)
        .where(
                blogPost.title.containsIgnoreCase(param.keyword())
        )
        .orderBy(getOrderSpecifiers(pageable))
                .offset(pageable.getOffset()) // skip first.  pageNumber × pageSize
                .limit(pageable.getPageSize())
                .fetch(); // 리스트 조회

        //게시글 개수 조회
        Long total = query
                .select(blogPost.count())
                .from(blogPost)
                .where(
                    blogPost.title.containsIgnoreCase(param.keyword())
                )
                .fetchOne(); // 단일 결과 조회 => 결과 2건 이상이면 예외


        return new PageImpl<>(list, pageable, total == null ? 0 : total);
    }

    private OrderSpecifier<?>[] getOrderSpecifiers(Pageable pageable){

        OrderSpecifier<?>[] orders = pageable.getSort().stream()
                .map(this::toOrderSpecifier)
                .toArray(OrderSpecifier[]::new);

        if(orders.length == 0){
            return  new OrderSpecifier[]{
                    blogPost.createdAt.desc(),
                    blogPost.id.desc()

            };

        }

        return  orders;
    }


    // sort 옵션 분류기
    private OrderSpecifier<?> toOrderSpecifier(Sort.Order order){
        boolean asc = order.isAscending();

        switch (order.getProperty()){
            case "createdAt":
                return asc? blogPost.createdAt.asc() : blogPost.createdAt.desc();
            default :
                return  blogPost.createdAt.desc();
        }


    }


}


