package io.linkloud.api.domain.tag;

import io.linkloud.api.shared.clock.ClockHolder;

import java.time.LocalDateTime;

public class Tag {
    private Long id;
    private long userId;
    private String name;
    private LocalDateTime createdAt;

    private Tag(long userId, String name) {
        this.userId = userId;
        this.name = name;
    }

    private Tag(long userId, String name, LocalDateTime createdAt) {
        this.userId = userId;
        this.name = name;
        this.createdAt = createdAt;
    }

    private Tag(Long id, long userId, String name, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.createdAt = createdAt;
    }

    public static Tag from(Long id, long userId, String name, LocalDateTime createdAt) {
        return new Tag(id, userId, name, createdAt);
    }

    public static Tag from(long userId, String name) {
        return new Tag(userId, name);
    }

    public static Tag from(long userId, String name, ClockHolder clockHolder) {
        return new Tag(userId, name, clockHolder.getCurrentTime());
    }

    public Long getId() {
        return id;
    }

    public long getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

}
