package io.linkloud.api.repository;

import io.linkloud.api.domain.link.Link;
import io.linkloud.api.domain.link.LinkRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class LinkRepositoryImpl implements LinkRepository {
    private final LinkJpaRepository jpaRepository;
    private final LinkTagJpaRepository linkTagJpaRepository;

    public LinkRepositoryImpl(LinkJpaRepository jpaRepository, LinkTagJpaRepository linkTagJpaRepository) {
        this.jpaRepository = jpaRepository;
        this.linkTagJpaRepository = linkTagJpaRepository;
    }

    @Override
    public Link save(Link link) {
        LinkEntity linkEntity = jpaRepository.save(
            new LinkEntity(
                link.getUserId(),
                link.getCollectionId(),
                link.getUrl(),
                link.getName(),
                link.getDescription(),
                link.getCreatedAt(),
                link.getUpdatedAt()
        ));
        List<LinkTagEntity> linkTagEntities = linkTagJpaRepository.saveAll(
            link.getTags().stream()
                .map((tag) -> new LinkTagEntity(linkEntity.getId(), tag.getId()))
                .collect(Collectors.toList())
        );
        return linkEntity.toLink(link.getTags());
    }

}
