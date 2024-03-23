package io.linkloud.api.repository;

import io.linkloud.api.domain.tag.Tag;
import io.linkloud.api.domain.tag.TagRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class TagRepositoryImpl implements TagRepository {
    private final TagJpaRepository jpaRepository;

    public TagRepositoryImpl(TagJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Optional<Tag> findByName(String name) {
        return jpaRepository.findByName(name)
            .map(TagEntity::toTag);
    }

    @Override
    public Tag save(Tag tag) {
        TagEntity tagEntity = jpaRepository.save(
            new TagEntity(
                tag.getUserId(),
                tag.getName(),
                tag.getCreatedAt()
            )
        );

        return tagEntity.toTag();
    }

}
