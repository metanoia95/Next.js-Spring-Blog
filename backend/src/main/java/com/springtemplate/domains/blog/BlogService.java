package com.springtemplate.domains.blog;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springtemplate.domains.blog.dto.comment.CommentsResDto;
import com.springtemplate.domains.blog.dto.comment.SaveCommentReqDto;
import com.springtemplate.domains.blog.dto.post.PostListResDto;
import com.springtemplate.domains.blog.dto.post.PostResDto;
import com.springtemplate.domains.blog.dto.post.SavePostReqDto;
import com.springtemplate.domains.blog.entity.BlogPost;
import com.springtemplate.domains.blog.entity.PostComment;
import com.springtemplate.domains.blog.repository.BlogPostRepository;
import com.springtemplate.domains.blog.repository.PostCommentRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BlogService {

	private final BlogPostRepository blogPostRepository;
	private final PostCommentRepository postCommentRepository;

	// 글 저장
	@Transactional
	public void savePost(Long authorId, SavePostReqDto dto) {
		
		BlogPost post = BlogPost
				.builder()
				.authorId(authorId)
				.title(dto.getTitle())
				.page_html(dto.getPage_html())
				.page_json(dto.getPage_json())
				.build();

		blogPostRepository.save(post);

	}

	// 글 목록 조회
	@Transactional(readOnly = true)
	public List<PostListResDto> getPostList() {

		List<BlogPost> listPost = blogPostRepository.findAll(); // 테이블 정보 전체 다 가져오기
		List<PostListResDto> result = new ArrayList<>(); // 값을 담아줄 dto

		for (BlogPost post : listPost) { // 매핑 반복문
			PostListResDto dto = PostListResDto.builder().id(post.getId()).title(post.getTitle())
					.created_at(post.getCreated_at()).build();

			result.add(dto);

		}
		return result;
		// 일단 엔터티 통째로 가져와서 DTO에 주입해서 프론트로 보냄.
		// 나중에 시간되면 리팩토링 할 것.

	}

	// 글 본문 조회
	@Transactional(readOnly = true)
	public PostResDto getPost(Long id) {

		BlogPost post = blogPostRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("글이 존재하지 않습니다"));


		PostResDto dto = PostResDto.builder()
				.id(post.getId())
				.authorId(post.getAuthorId())
				.title(post.getTitle())
				.page_html(post.getPage_html())
				.page_json(post.getPage_json())
				.created_at(post.getCreated_at())
				.build();

		return dto;
	}

	// 글 삭제
	@Transactional
	public void deletePost(Long id) {

		blogPostRepository.deleteById(id);

	}

	// 글 수정용 json 불러오기
	@Transactional(readOnly = true)
	public PostResDto getPostJson(Long id) {

		BlogPost post = blogPostRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("글이 존재하지 않습니다"));

		PostResDto dto = PostResDto.builder().id(post.getId()).title(post.getTitle()).page_json(post.getPage_json())
				.build();

		return dto;
	}

	// 글 수정
	@Transactional
	public void updatePost(SavePostReqDto dto) {
		// 기존 엔터티 조회
		BlogPost post = blogPostRepository.findById(dto.getId())
				.orElseThrow(() -> new EntityNotFoundException("Post not found: id=" + dto.getId()));
		
		
		// 2) 세터로 필드 업데이트
		post.setTitle(dto.getTitle());
		post.setPage_json(dto.getPage_json());
		post.setPage_html(dto.getPage_html());
		// updatedAt 은 @UpdateTimestamp가 자동 반영해 줍니다.
		blogPostRepository.save(post);

	}

	// 댓글 저장
	@Transactional
	public void saveComment(Long authorId, SaveCommentReqDto dto) {

		PostComment comment = PostComment
				.builder()
				.authorId(authorId)
				.postId(dto.getPost_id())
				.text(dto.getText())
				.build();
		postCommentRepository.save(comment);

	}

	// 댓글 목록 조회
	@Transactional(readOnly = true)
	public List<CommentsResDto> getCommentListByPostId(Long postId) {

		List<PostComment> commentList = postCommentRepository.findAllByPostId(postId);

		List<CommentsResDto> result = new ArrayList<>();

		for (PostComment comment : commentList) {
			CommentsResDto dto = CommentsResDto
					.builder()
					.id(comment.getId())
					.authorId(comment.getAuthorId())
					.text(comment.getText())
					.createdAt(comment.getCreatedAt())
					.build();
			result.add(dto);
		}

		return result;
	}

	// 댓글 삭제
	@Transactional
	public void deleteComment(Long id) {

		postCommentRepository.deleteById(id);

	}

}
