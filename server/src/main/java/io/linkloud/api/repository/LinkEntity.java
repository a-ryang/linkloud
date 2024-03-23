package io.linkloud.api.repository;

import io.linkloud.api.domain.link.Link;
import io.linkloud.api.domain.tag.Tag;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.List;

@Table(name = "link")
@Entity
public class LinkEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "collection_id")
    private Long collectionId;

    @Column(nullable = false)
    private String url;

    @Column(nullable = false, length = 64)
    private String name;

    @Column(nullable = false, length = 256)
    private String description;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    protected LinkEntity() {
    }

    public LinkEntity(Long userId, Long collectionId, String url, String name, String description, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.userId = userId;
        this.collectionId = collectionId;
        this.url = url;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Link toLink(List<Tag> tags) {
        return new Link(
            id,
            userId,
            collectionId,
            url,
            name,
            description,
            tags,
            createdAt,
            updatedAt,
            deletedAt
        );
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getCollectionId() {
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
