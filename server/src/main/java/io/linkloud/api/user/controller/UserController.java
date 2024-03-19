package io.linkloud.api.user.controller;

import io.linkloud.api.user.controller.response.UserResponse;
import io.linkloud.api.user.domain.UserCreate;
import io.linkloud.api.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@RestController
public class UserController {


    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserResponse> create(@Valid @RequestBody UserCreate userCreate) {
        UserResponse response = UserResponse.from(userService.create(userCreate));
        return ResponseEntity.ok(response);
    }

}
