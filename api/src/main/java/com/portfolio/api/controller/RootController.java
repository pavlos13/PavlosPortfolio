package com.portfolio.api.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Root endpoint so http://localhost:8080 returns a valid response
 * instead of an error in the browser.
 */
@RestController
public class RootController {

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> root() {
        return ResponseEntity.ok(Map.of(
                "service", "portfolio-api",
                "message", "API is running. Use the frontend at http://localhost:5173",
                "health", "/api/health",
                "youtube", "/api/youtube/videos"
        ));
    }
}
