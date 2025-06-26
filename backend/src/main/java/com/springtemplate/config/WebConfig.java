package com.springtemplate.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	
	@Override
	public void addCorsMappings(CorsRegistry registry){
		registry.addMapping("/api/**")
			 	.allowedOrigins("http://localhost:5173", "http://localhost:3000")
			 	.allowedMethods("GET","POST", "PUT","DELETE")
			 	.allowCredentials(true); // 세션 유지용 쿠키 전달 가능
		
		
	}
	
	 @Override
	    public void addResourceHandlers(ResourceHandlerRegistry registry) {
	        registry.addResourceHandler("/images/**")  // 브라우저에서 접근할 URL 경로
	                .addResourceLocations("file:///C:/save/"); // 실제 로컬 디스크 경로
	    }
	 
	 
	
	
}
