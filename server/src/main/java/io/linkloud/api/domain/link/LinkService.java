package io.linkloud.api.domain.link;

import io.linkloud.api.domain.exception.CollectionNotFoundException;

import io.linkloud.api.domain.tag.Tag;
import io.linkloud.api.domain.tag.TagRepository;
import io.linkloud.api.shared.clock.ClockHolder;
import io.linkloud.api.domain.collection.Collection;
import io.linkloud.api.domain.collection.CollectionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LinkService {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private final LinkRepository repository;
    private final CollectionRepository collectionRepository;
    private final TagRepository tagRepository;
    private final ClockHolder clockHolder;

    public LinkService(LinkRepository repository, CollectionRepository collectionRepository, TagRepository tagRepository, ClockHolder clockHolder) {
        this.repository = repository;
        this.collectionRepository = collectionRepository;
        this.tagRepository = tagRepository;
        this.clockHolder = clockHolder;
    }

    /**
     * 링크를 콜렉션에 생성한다
     */
    @Transactional
    public Link create(long userId, NewLink newLink) {
        Collection collection = collectionRepository.findById(newLink.getCollectionId())
            .orElseThrow(() -> new CollectionNotFoundException(newLink.getCollectionId()));

        collection.validateOwner(userId);

        List<Tag> tags = newLink.getTags().stream()
            .map((tag) -> tagRepository.findByName(tag.getName())
                .orElseGet(() -> {
                    log.info("create new tag : {}", tag.getName());
                    Tag newTag = Tag.from(userId, tag.getName(), clockHolder);
                    return tagRepository.save(newTag);
                })
            ).toList();

        Link link = Link.from(userId, newLink, tags, clockHolder);
        link = repository.save(link);

        return link;
    }

}
