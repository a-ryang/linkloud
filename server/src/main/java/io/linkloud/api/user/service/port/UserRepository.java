package io.linkloud.api.user.service.port;

import io.linkloud.api.user.domain.User;
import java.util.Optional;

public interface UserRepository {

    User save(User user);

    Optional<User> findById(Long userId);
}
