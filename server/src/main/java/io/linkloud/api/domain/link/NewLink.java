package io.linkloud.api.domain.link;

import io.linkloud.api.domain.tag.Tag;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import org.springframework.util.Assert;

import java.util.List;

public class NewLink {
    @NotNull
    private long collectionId;
    @NotBlank(message = "url must be not blank")
    private String url;
    @NotBlank(message = "name must be not blank")
    private String name;
    private String description;
    private List<Tag> tags;

    public NewLink(long collectionId, String url, String name, String description, List<Tag> tags) {
        Assert.notNull(url, "url must be not null");
        Assert.isTrue(url.length() < 1000, "url length must be less than 1000 characters.");
        Assert.notNull(name, "name must be not null");
        Assert.isTrue(name.length() < 40, "name length must be less than 40 characters");
        if(description != null) {
            Assert.isTrue(description.length() < 250, "description length must be less than 250 characters if not null");
        }

        this.collectionId = collectionId;
        this.url = url;
        this.name = name;
        this.description = description;
        this.tags = tags;
    }

    public long getCollectionId() {
        return collectionId;
    }

    public String getUrl() {
        return url;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

}
