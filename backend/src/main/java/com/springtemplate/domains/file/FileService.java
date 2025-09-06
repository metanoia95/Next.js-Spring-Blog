package com.springtemplate.domains.file;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileService {
	
	String savePath = "C:/uploads/";
	
	
	@Transactional
	public String uploadImage(MultipartFile file){
		
		File dir = new File(savePath);
		if (!dir.exists()) {
		    dir.mkdirs();
		}
		
		
		String uuid = UUID.randomUUID().toString();
		
		String filename = uuid+file.getOriginalFilename();
		
		Path path = Paths.get(savePath,filename);
		
		try {
			file.transferTo(path);
		} catch (IllegalStateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		
		return "/uploads/"+filename;
		
		
	}
	
}
