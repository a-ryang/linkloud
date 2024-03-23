package io.linkloud.api.web.controller.response;

import io.linkloud.api.domain.tag.Tag;

public class TagResponse {
    private long id;
    private String name;

    public TagResponse(Tag tag) {
        this.id = tag.getId();
        this.name = tag.getName();
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

}
