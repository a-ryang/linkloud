package io.linkloud.api.user.domain;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class UserCreate {

    @NotBlank(message = "email must not be blank.")
    private String email;
    @NotBlank(message = "nickname must not be blank.")
    private String nickname;
    @NotBlank(message = "password must not be blank.")
    private String password;

}
