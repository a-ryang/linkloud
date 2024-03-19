package io.linkloud.api.link.service.port;

import io.linkloud.api.link.domain.Link;

public interface LinkRepository {

    Link save(Link link);

}
