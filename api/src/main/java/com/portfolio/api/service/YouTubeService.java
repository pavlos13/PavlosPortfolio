package com.portfolio.api.service;

import com.portfolio.api.dto.YouTubeVideoDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Fetches all uploads from a YouTube channel via the YouTube Data API v3.
 * Uses forHandle for @handle custom URLs, with fallback to forUsername.
 */
@Service
public class YouTubeService {

    private static final String CHANNELS_URL = "https://www.googleapis.com/youtube/v3/channels";
    private static final String PLAYLIST_ITEMS_URL = "https://www.googleapis.com/youtube/v3/playlistItems";
    private static final int MAX_RESULTS = 50;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String apiKey;
    private final String channelHandle;

    public YouTubeService(
            @Value("${youtube.api-key:}") String apiKey,
            @Value("${youtube.channel-handle:pavlosrev}") String channelHandle) {
        this.apiKey = apiKey != null ? apiKey.trim() : "";
        this.channelHandle = (channelHandle != null ? channelHandle : "pavlosrev").replaceAll("^@", "");
    }

    public List<YouTubeVideoDto> fetchAllChannelVideos() {
        if (apiKey.isEmpty()) {
            throw new IllegalStateException("YouTube API key is not configured. Set youtube.api-key or YOUTUBE_API_KEY.");
        }
        String playlistId = getUploadsPlaylistId();
        return fetchAllPlaylistVideos(playlistId);
    }

    @SuppressWarnings("unchecked")
    private String getUploadsPlaylistId() {
        String url = CHANNELS_URL + "?part=contentDetails&forHandle=" + channelHandle + "&key=" + apiKey;
        Map<String, Object> data = restTemplate.getForObject(url, Map.class);
        Map<String, Object> channel = firstItem(data);
        if (channel != null) {
            Map<String, Object> contentDetails = (Map<String, Object>) channel.get("contentDetails");
            if (contentDetails != null) {
                Map<String, Object> relatedPlaylists = (Map<String, Object>) contentDetails.get("relatedPlaylists");
                if (relatedPlaylists != null && relatedPlaylists.get("uploads") != null) {
                    return (String) relatedPlaylists.get("uploads");
                }
            }
        }
        url = CHANNELS_URL + "?part=contentDetails&forUsername=" + channelHandle + "&key=" + apiKey;
        data = restTemplate.getForObject(url, Map.class);
        channel = firstItem(data);
        if (channel != null) {
            Map<String, Object> contentDetails = (Map<String, Object>) channel.get("contentDetails");
            if (contentDetails != null) {
                Map<String, Object> relatedPlaylists = (Map<String, Object>) contentDetails.get("relatedPlaylists");
                if (relatedPlaylists != null && relatedPlaylists.get("uploads") != null) {
                    return (String) relatedPlaylists.get("uploads");
                }
            }
        }
        throw new IllegalStateException("Could not get channel uploads playlist for: " + channelHandle);
    }

    @SuppressWarnings("unchecked")
    private List<YouTubeVideoDto> fetchAllPlaylistVideos(String playlistId) {
        List<YouTubeVideoDto> videos = new ArrayList<>();
        String pageToken = null;
        do {
            String url = PLAYLIST_ITEMS_URL + "?part=snippet&playlistId=" + playlistId
                    + "&maxResults=" + MAX_RESULTS + "&key=" + apiKey;
            if (pageToken != null) {
                url += "&pageToken=" + pageToken;
            }
            Map<String, Object> data = restTemplate.getForObject(url, Map.class);
            List<Map<String, Object>> items = (List<Map<String, Object>>) data.get("items");
            if (items != null) {
                for (Map<String, Object> item : items) {
                    Map<String, Object> snippet = (Map<String, Object>) item.get("snippet");
                    if (snippet == null) continue;
                    Map<String, Object> resourceId = (Map<String, Object>) snippet.get("resourceId");
                    if (resourceId == null) continue;
                    String videoId = (String) resourceId.get("videoId");
                    if (videoId == null) continue;

                    String title = (String) snippet.get("title");
                    String description = (String) snippet.get("description");
                    String publishedAt = (String) snippet.get("publishedAt");

                    String thumbnail = null;
                    Map<String, Object> thumbnails = (Map<String, Object>) snippet.get("thumbnails");
                    if (thumbnails != null) {
                        Map<String, Object> medium = (Map<String, Object>) thumbnails.get("medium");
                        Map<String, Object> def = (Map<String, Object>) thumbnails.get("default");
                        if (medium != null) thumbnail = (String) medium.get("url");
                        if (thumbnail == null && def != null) thumbnail = (String) def.get("url");
                    }
                    if (thumbnail == null) {
                        thumbnail = "https://img.youtube.com/vi/" + videoId + "/mqdefault.jpg";
                    }

                    String watchUrl = "https://www.youtube.com/watch?v=" + videoId;
                    videos.add(new YouTubeVideoDto(
                            videoId,
                            title != null ? title : "",
                            description != null ? description : "",
                            thumbnail,
                            publishedAt != null ? publishedAt : "",
                            watchUrl
                    ));
                }
            }
            pageToken = (String) data.get("nextPageToken");
        } while (pageToken != null);
        return videos;
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> firstItem(Map<String, Object> data) {
        if (data == null) return null;
        List<Map<String, Object>> items = (List<Map<String, Object>>) data.get("items");
        return (items != null && !items.isEmpty()) ? items.get(0) : null;
    }
}
