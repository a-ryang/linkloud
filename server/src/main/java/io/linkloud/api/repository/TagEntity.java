package io.linkloud.api.repository;

import io.linkloud.api.domain.tag.Tag;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Table(name = "tag")
@Entity
public class TagEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    @Column(nullable = false, length = 32)
    private String name;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    protected TagEntity() {
    }

    public TagEntity(Long userId, String name, LocalDateTime createdAt) {
        this.userId = userId;
        this.name = name;
        this.createdAt = createdAt;
    }

    public Tag toTag() {
        return Tag.from(id, userId, name, createdAt);
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

}
