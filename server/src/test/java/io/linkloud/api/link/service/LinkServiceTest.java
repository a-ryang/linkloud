package io.linkloud.api.link.service;


import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import io.linkloud.api.link.domain.Link;
import io.linkloud.api.link.domain.LinkCreate;
import io.linkloud.api.user.domain.UserCreate;
import io.linkloud.api.user.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
@SpringBootTest
class LinkServiceTest {


    @Autowired
    private LinkService linkService;

    @Autowired
    private UserService userService;

    @BeforeEach
    void init() {
        UserCreate userCreate = new UserCreate("test@test.com","son","password!");
        userService.create(userCreate);
    }

    @DisplayName("성공 : 링크 생성")
    @Test
    void create() {

        // given
        Long userId = 1L;
        LinkCreate linkCreate = new LinkCreate("url", "name", "desc", userId);

        // when
        Link link = linkService.create(linkCreate);

        // then
        assertThat(link.getId()).isEqualTo(1L);
        assertThat(link.getName()).isEqualTo("name");
        assertThat(link.getDescription()).isEqualTo("desc");
        assertThat(link.getUrl()).isEqualTo("url");
        assertThat(link.getUserId()).isEqualTo(1L);
    }

    @DisplayName("실패 : 없는 유저 링크 생성")
    @Test
    void create_fail_not_exist_user() {

        // given
        Long userId = 9999L;
        LinkCreate linkCreate = new LinkCreate("url", "name", "desc", userId);

        // when then
        assertThatThrownBy(() -> {
            linkService.create(linkCreate);
        }).isInstanceOf(RuntimeException.class);
    }
}