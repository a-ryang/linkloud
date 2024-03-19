package io.linkloud.api.user.domain;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class User {
    private Long id;
    private String nickname;
    private String email;
    private String password;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;

    public static User from(UserCreate userCreate) {
        return User.builder()
            .nickname(userCreate.getNickname())
            .email(userCreate.getEmail())
            .password(userCreate.getPassword())
            .build();
    }


}
