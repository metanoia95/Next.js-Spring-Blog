package com.springtemplate.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {

	public static CustomUserDetails getCurrentUserDetails() {
	    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    if (auth != null && auth.isAuthenticated() && auth.getPrincipal() instanceof CustomUserDetails userDetails) {
	        return userDetails;
	    }
	    return null;
	}

	public static Long getCurrentUserId() {
	    CustomUserDetails userDetails = getCurrentUserDetails();
	    return (userDetails != null) ? userDetails.getId() : null;
	}
	
}
