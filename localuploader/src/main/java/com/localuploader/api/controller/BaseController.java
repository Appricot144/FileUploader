package com.localuploader.api.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class BaseController {
	
	@GetMapping
    public Map<String, String> hello() {
        Map<String, String> map = Map.of("message", "Hello World!");
        return map;
    }
}
