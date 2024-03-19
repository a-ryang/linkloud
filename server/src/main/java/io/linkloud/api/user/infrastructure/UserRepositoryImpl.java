package io.linkloud.api.user.infrastructure;

import io.linkloud.api.user.domain.User;
import io.linkloud.api.user.service.port.UserRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class UserRepositoryImpl implements UserRepository {

    private final UserJpaRepository userJpaRepository;

    @Override
    public User save(User user) {
        UserEntity entity = userJpaRepository.save(UserEntity.from(user));
        return entity.toModel();
    }

    @Override
    public Optional<User> findById(Long userId) {
        Optional<UserEntity> entity = userJpaRepository.findById(userId);
        return entity.map(UserEntity::toModel);
    }

}
