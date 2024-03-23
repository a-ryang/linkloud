package io.linkloud.api.repository;

import io.linkloud.api.domain.collection.Collection;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Table(name = "collection")
@Entity
public class CollectionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(nullable = false, length = 32)
    private String title;

    @Column(length = 64)
    private String description;

    private Boolean isPublic;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    public Collection toCollection() {
        return new Collection(
            id,
            userId,
            title,
            description,
            isPublic,
            createdAt,
            updatedAt,
            deletedAt
        );
    }

}
