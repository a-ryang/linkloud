package io.linkloud.api.repository;

import io.linkloud.api.domain.collection.Collection;
import io.linkloud.api.domain.collection.CollectionRepository;

import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class CollectionRepositoryImpl implements CollectionRepository {

    private final CollectionJpaRepository jpaRepository;

    public CollectionRepositoryImpl(CollectionJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Optional<Collection> findById(long id) {
        return jpaRepository.findById(id)
            .map(CollectionEntity::toCollection);
    }

}
