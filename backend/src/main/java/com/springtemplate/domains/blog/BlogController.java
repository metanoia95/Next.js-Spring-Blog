package com.springtemplate.domains.blog;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springtemplate.domains.blog.dto.comment.CommentsResDto;
import com.springtemplate.domains.blog.dto.comment.SaveCommentReqDto;
import com.springtemplate.domains.blog.dto.post.PostListResDto;
import com.springtemplate.domains.blog.dto.post.PostResDto;
import com.springtemplate.domains.blog.dto.post.SavePostReqDto;
import com.springtemplate.security.CustomUserDetails;
import com.springtemplate.security.SecurityUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/blog")
@RequiredArgsConstructor
public class BlogController {

	private final BlogService blogService;

	// 글 목록 조회
	@GetMapping("/posts")
	public ResponseEntity<?> getPostList() {

		List<PostListResDto> result = blogService.getPostList();

		return ResponseEntity.ok(result);
	}

	// 글 수정용 Json 조회
	@GetMapping("/posts/getjson/{id}")
	public ResponseEntity<?> getPostJsonById(@PathVariable Long id) {

		PostResDto result = blogService.getPostJson(id);
		return ResponseEntity.ok(result);

	}

	// 글 본문 조회
	@GetMapping("/posts/{id}")
	public ResponseEntity<?> getPostById(@PathVariable Long id) {

		PostResDto result = blogService.getPost(id);
		return ResponseEntity.ok(result);

	}

	// 글 저장
	@PostMapping("/saveblogpost")
	public ResponseEntity<?> savePost(@RequestBody SavePostReqDto dto) {

		blogService.savePost(dto);
		return ResponseEntity.ok().build();

	}

	// 글 삭제
	@DeleteMapping("/posts/{id}")
	public ResponseEntity<?> deletePostById(@PathVariable Long id) {

		blogService.deletePost(id);
		return ResponseEntity.ok().build();

	}

	// 글 수정
	@PutMapping("/posts")
	public ResponseEntity<?> updatePostById(@RequestBody SavePostReqDto dto) {
		
		blogService.updatePost(dto);
		return ResponseEntity.ok().build();

	}

	// 댓글 저장
	@PostMapping("/comment")
	public ResponseEntity<?> saveCommentByPostId(@RequestBody SaveCommentReqDto dto) {
		Long userId = SecurityUtil.getCurrentUserId();
		
		blogService.saveComment(userId ,dto);

		return ResponseEntity.ok().build();

	}

	// 댓글 목록 조회
	@GetMapping("/comments/{postId}")
	public ResponseEntity<?> getCommentbyPostId(@PathVariable Long postId) {

		List<CommentsResDto> result = blogService.getCommentListByPostId(postId);

		return ResponseEntity.ok(result);

	}

	// 댓글 삭제
	@DeleteMapping("/comment/{id}")
	public ResponseEntity<?> deleteCommentById(@PathVariable Long id) {

		blogService.deleteComment(id);
		return ResponseEntity.ok().build();

	}

}
