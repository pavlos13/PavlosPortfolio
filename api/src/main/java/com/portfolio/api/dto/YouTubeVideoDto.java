package com.portfolio.api.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
public record YouTubeVideoDto(
        String id,
        String title,
        String description,
        String thumbnail,
        String publishedAt,
        String url
) {}
