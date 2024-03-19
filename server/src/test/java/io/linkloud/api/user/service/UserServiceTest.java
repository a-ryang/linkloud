package io.linkloud.api.user.service;


import static org.assertj.core.api.Assertions.assertThat;

import io.linkloud.api.user.domain.User;
import io.linkloud.api.user.domain.UserCreate;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class UserServiceTest {

    @Autowired
    private UserService userService;

    @DisplayName("성공 : 유저 생성")
    @Test
    void create() {
        UserCreate userCreate = new UserCreate("test@test.com","son","password!");

        User user = userService.create(userCreate);
        assertThat(user.getId()).isEqualTo(1L);
        assertThat(user.getEmail()).isEqualTo("test@test.com");
        assertThat(user.getNickname()).isEqualTo("son");
        assertThat(user.getPassword()).isEqualTo("password!");
    }
}