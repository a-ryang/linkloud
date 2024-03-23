package io.linkloud.api.domain.link;

import java.time.LocalDateTime;
import java.util.List;

import io.linkloud.api.domain.tag.Tag;
import io.linkloud.api.shared.clock.ClockHolder;

public class Link {
    private long id;
    private long userId;
    private long collectionId;
    private String url;
    private String name;
    private String description;
    private List<Tag> tags;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;

    public Link(long id, long userId, long collectionId, String url, String name, String description, List<Tag> tags, LocalDateTime createdAt, LocalDateTime updatedAt, LocalDateTime deletedAt) {
        this.id = id;
        this.userId = userId;
        this.collectionId = collectionId;
        this.url = url;
        this.name = name;
        this.description = description;
        this.tags = tags;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    public Link(long userId, long collectionId, String url, String name, String description, List<Tag> tags, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.userId = userId;
        this.collectionId = collectionId;
        this.url = url;
        this.name = name;
        this.description = description;
        this.tags = tags;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static Link from(long userId, NewLink newLink, List<Tag> tags, ClockHolder clockHolder) {
        return new Link(
            userId,
            newLink.getCollectionId(),
            newLink.getUrl(),
            newLink.getName(),
            newLink.getDescription(),
            tags,
            clockHolder.getCurrentTime(),
            clockHolder.getCurrentTime()
        );
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

    public List<Tag> getTags() {
        return tags;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }
}
