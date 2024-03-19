package io.linkloud.api.user.service;

import io.linkloud.api.user.domain.User;
import io.linkloud.api.user.domain.UserCreate;
import io.linkloud.api.user.service.port.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public User create(UserCreate userCreate) {
        User user = User.from(userCreate);
        user = userRepository.save(user);
        return user;
    }

}
