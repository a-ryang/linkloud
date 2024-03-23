package io.linkloud.api.web.controller.response;

import io.linkloud.api.domain.link.Link;
import io.linkloud.api.domain.tag.Tag;

import java.time.LocalDateTime;
import java.util.List;

public class LinkResponse {
    private long id;
    private long userId;
    private long collectionId;
    private String url;
    private String name;
    private String description;
    private List<TagResponse> tags;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public LinkResponse(Link link) {
        this.id = link.getId();
        this.userId = link.getUserId();
        this.collectionId = link.getCollectionId();
        this.url = link.getUrl();
        this.name = link.getName();
        this.description = link.getDescription();
        this.tags = link.getTags().stream().map(TagResponse::new).toList();
        this.createdAt = link.getCreatedAt();
        this.updatedAt = link.getUpdatedAt();
    }

    public long getId() {
        return id;
    }

    public long getUserId() {
        return userId;
    }

    public long getCollectionId() {
        return collectionId;
    }

    public String getUrl() {
        return url;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public List<TagResponse> getTags() {
        return tags;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
