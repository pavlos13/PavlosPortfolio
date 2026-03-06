package com.portfolio.api.controller;

import com.portfolio.api.dto.YouTubeVideoDto;
import com.portfolio.api.service.YouTubeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Exposes YouTube channel videos for the portfolio frontend (e.g. Cooking videos page).
 */
@RestController
@RequestMapping("/api/youtube")
public class YouTubeController {

    private final YouTubeService youTubeService;

    public YouTubeController(YouTubeService youTubeService) {
        this.youTubeService = youTubeService;
    }

    @GetMapping("/videos")
    public ResponseEntity<?> getVideos() {
        try {
            List<YouTubeVideoDto> videos = youTubeService.fetchAllChannelVideos();
            return ResponseEntity.ok(videos);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(503).body(new ErrorMessage(e.getMessage()));
        }
    }

    private record ErrorMessage(String message) {}
}
