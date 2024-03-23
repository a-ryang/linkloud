package io.linkloud.api.domain.tag;

import java.util.Optional;

public interface TagRepository {
    Optional<Tag> findByName(String name);
    Tag save(Tag tag);
}
