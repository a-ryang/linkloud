package io.linkloud.api.domain.collection;

import io.linkloud.api.domain.exception.CollectionOwnershipException;

import java.time.LocalDateTime;

public class Collection {
    private Long id;
    private long userId;
    private String title;
    private String description;
    private boolean isPublic;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;

    public Collection(Long id, long userId, String title, String description, boolean isPublic, LocalDateTime createdAt, LocalDateTime updatedAt, LocalDateTime deletedAt) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.isPublic = isPublic;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    public void validateOwner(long userId) {
        if(this.userId != userId) {
            throw new CollectionOwnershipException(userId);
        }
    }

}
