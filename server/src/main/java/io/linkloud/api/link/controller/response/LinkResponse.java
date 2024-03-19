package io.linkloud.api.link.controller.response;

import io.linkloud.api.link.domain.Link;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LinkResponse {

    private Long id;
    private Long userId;
    private Long collectionId;
    private String url;
    private String name;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;

    public static LinkResponse from(Link link) {
        return LinkResponse.builder()
            .id(link.getId())
            .userId(link.getUserId())
            .collectionId(link.getCollectionId())
            .url(link.getUrl())
            .name(link.getName())
            .description(link.getDescription())
            .createdAt(link.getCreatedAt())
            .updatedAt(link.getUpdatedAt())
            .deletedAt(link.getDeletedAt())
            .build();
    }

}
