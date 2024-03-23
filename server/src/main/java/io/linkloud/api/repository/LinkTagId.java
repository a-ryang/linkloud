package io.linkloud.api.repository;

import java.io.Serializable;
import java.util.Objects;

public class LinkTagId implements Serializable {

    private Long linkId;
    private Long tagId;

    public LinkTagId() {
    }

    public LinkTagId(Long linkId, Long tagId) {
        this.linkId = linkId;
        this.tagId = tagId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LinkTagId linkTagId = (LinkTagId) o;
        return Objects.equals(linkId, linkTagId.linkId) && Objects.equals(tagId, linkTagId.tagId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(linkId, tagId);
    }

}
