package com.springtemplate.domains.blog.dto.comment;

import com.springtemplate.domains.blog.entity.PostComment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
@Builder
public class SaveCommentReqDto {

    private Long post_id;
    private String text;

    public PostComment toEntity(){
        return  PostComment.builder()
                .postId(this.post_id)
                .text(this.text)
                .build();

    }

}