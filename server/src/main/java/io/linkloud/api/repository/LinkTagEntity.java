package io.linkloud.api.repository;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

@Table(name = "link_tag")
@Entity
@IdClass(LinkTagId.class)
public class LinkTagEntity {

    @Id
    private Long linkId;

    @Id
    private Long tagId;

    public LinkTagEntity() {
    }

    public LinkTagEntity(Long linkId, Long tagId) {
        this.linkId = linkId;
        this.tagId = tagId;
    }

    public Long getLinkId() {
        return linkId;
    }

    public Long getTagId() {
        return tagId;
    }
}
