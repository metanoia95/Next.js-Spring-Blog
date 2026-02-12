package com.springtemplate.domains.file;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class FileService {
	
	
	private final Path FILE_PATH ;

	public FileService(@Value("${files.dir}") String dir){
		this.FILE_PATH = Paths.get(dir);
	}

	
	@Transactional
	public String uploadImage(MultipartFile file) throws IOException {

		if (file.isEmpty()) {
			throw new RuntimeException("파일이 비어있습니다.");
		}
		
		if(!Files.exists(FILE_PATH)){
			Files.createDirectories(FILE_PATH);
		}

		String uuid = UUID.randomUUID().toString();
		String originalFilename = file.getOriginalFilename();
		String extension = StringUtils.getFilenameExtension(originalFilename);
		String filename = uuid+"."+extension;

		Path path = FILE_PATH
				.resolve(filename)
				.normalize()
				.toAbsolutePath();
		
		try {
			file.transferTo(path);
			
			return "/uploads/"+filename;
		} catch (IOException e) {
			throw new RuntimeException("파일 저장 실패 ",e);
		}



		
	}
	
}
