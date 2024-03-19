package io.linkloud.api.user.infrastructure;

import io.linkloud.api.user.domain.User;
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
@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nickname;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    public static UserEntity from(User user) {
        return UserEntity.builder()
            .id(user.getId())
            .nickname(user.getNickname())
            .email(user.getEmail())
            .password(user.getPassword())
            .createdAt(user.getCreatedAt())
            .updatedAt(user.getUpdatedAt())
            .deletedAt(user.getDeletedAt())
            .build();
    }

    public User toModel() {
        return User.builder()
            .id(id)
            .nickname(nickname)
            .email(email)
            .password(password)
            .createdAt(createdAt)
            .updatedAt(updatedAt)
            .deletedAt(deletedAt)
            .build();
    }
}
