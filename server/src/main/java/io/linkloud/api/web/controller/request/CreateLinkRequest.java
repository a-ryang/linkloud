package io.linkloud.api.web.controller.request;

import io.linkloud.api.domain.link.NewLink;
import io.linkloud.api.domain.tag.Tag;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import org.hibernate.validator.constraints.URL;

import java.util.List;
import java.util.stream.Collectors;

public class CreateLinkRequest {

    @NotNull
    private long collectionId;

    @URL
    @NotBlank(message = "url must be not blank")
    private String url;

    @NotBlank(message = "name must be not blank")
    private String name;

    private String description;

    private List<@NotBlank(message = "tag name must not be blank") @Size(max = 20, message = "tag name must be less than or equal to 20 characters") String> tags;

    public NewLink toNewLink(long userId) {
        return new NewLink(
            collectionId,
            url,
            name,
            description,
            tags.stream()
                .map((tagName) -> Tag.from(userId, tagName))
                .collect(Collectors.toList())
        );
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

    public List<String> getTags() {
        return tags;
    }

}