package com.springtemplate.domains.file;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class FileController {
	
	private final FileService fileService;
	
	@PostMapping("/image")
	public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file){
		
		String imgPath=fileService.uploadImage(file);
		
		//리턴값은 이미지 주소값.
		return ResponseEntity.ok(imgPath);
	}
	
	
}
