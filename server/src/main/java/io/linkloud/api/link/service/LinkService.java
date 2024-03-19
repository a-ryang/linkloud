package io.linkloud.api.link.service;

import io.linkloud.api.common.service.port.ClockHolder;
import io.linkloud.api.link.domain.Link;
import io.linkloud.api.link.domain.LinkCreate;
import io.linkloud.api.link.service.port.LinkRepository;
import io.linkloud.api.user.domain.User;
import io.linkloud.api.user.service.port.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class LinkService {

    private final LinkRepository linkRepository;
    private final UserRepository userRepository;
    private final ClockHolder clockHolder;

    @Transactional
    public Link create(LinkCreate linkCreate) {

        User user = userRepository.findById(linkCreate.getUserId())
            .orElseThrow(() -> new RuntimeException("유저 찾기 에러"));

        Link link = Link.from(linkCreate,user,clockHolder);

        link = linkRepository.save(link);
        return link;
    }

}
