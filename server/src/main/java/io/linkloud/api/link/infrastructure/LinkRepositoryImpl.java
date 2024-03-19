package io.linkloud.api.link.infrastructure;

import io.linkloud.api.link.domain.Link;
import io.linkloud.api.link.service.port.LinkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class LinkRepositoryImpl implements LinkRepository {

    private final LinkJpaRepository linkJpaRepository;

    @Override
    public Link save(Link link) {
        LinkEntity entity = linkJpaRepository.save(LinkEntity.from(link));
        return entity.toModel();
    }

}
