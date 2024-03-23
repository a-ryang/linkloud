package io.linkloud.api.domain.collection;

import java.util.Optional;

public interface CollectionRepository {
    Optional<Collection> findById(long id);
}
