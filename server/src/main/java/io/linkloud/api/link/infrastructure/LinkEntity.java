package io.linkloud.api.link.infrastructure;

import io.linkloud.api.link.domain.Link;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Table(name = "links")
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

    public static LinkEntity from(Link link) {
        return LinkEntity.builder()
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

    public Link toModel() {
        return Link.builder()
            .id(id)
            .userId(userId)
            .collectionId(collectionId)
            .url(url)
            .name(name)
            .description(description)
            .createdAt(createdAt)
            .updatedAt(updatedAt)
            .deletedAt(deletedAt)
            .build();

    }

}
