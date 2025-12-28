package com.springtemplate.domains.blog;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.springtemplate.domains.blog.dto.comment.CommentsResDto;
import com.springtemplate.domains.blog.dto.comment.SaveCommentReqDto;
import com.springtemplate.domains.blog.dto.post.res.PostListDto;
import com.springtemplate.domains.blog.dto.post.res.PostDto;
import com.springtemplate.domains.blog.dto.post.res.SavePostDto;
import com.springtemplate.security.SecurityUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/blog")
@RequiredArgsConstructor
public class BlogController {

	private final BlogService blogService;

	// 글 목록 조회
	@GetMapping("/posts")
	public ResponseEntity<?> getPostList(
			@RequestParam(required = false) String keyword,
			@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int pageSize
	) {

		Page<PostListDto> result = blogService.getPostList(keyword, page, pageSize);

		return ResponseEntity.ok(result);
	}

	// 글 수정용 Json 조회
	@GetMapping("/posts/getjson/{id}")
	public ResponseEntity<?> getPostJsonById(@PathVariable Long id) {

		PostDto result = blogService.getPostJson(id);
		return ResponseEntity.ok(result);

	}

	// 글 본문 조회
	@GetMapping("/posts/{id}")
	public ResponseEntity<?> getPostById(@PathVariable Long id) {

		PostDto result = blogService.getPost(id);
		return ResponseEntity.ok(result);

	}

	// 글 저장
	@PostMapping("/saveblogpost")
	public ResponseEntity<?> savePost(@RequestBody SavePostDto dto) {
		Long authorId = SecurityUtil.getCurrentUserId(); // 액세스 토큰에서 작성자 id 파싱
		blogService.savePost(authorId ,dto);
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
	public ResponseEntity<?> updatePostById(@RequestBody SavePostDto dto) {
		
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
