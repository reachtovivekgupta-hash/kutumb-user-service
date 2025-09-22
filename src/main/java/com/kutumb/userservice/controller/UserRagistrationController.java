package com.kutumb.userservice.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserRagistrationController {
	
	@RequestMapping("/ragisterUser")
	public  String userLogin() {
		
		return "hello";
	}

}
