package io.linkloud.api.domain.tag;

import org.springframework.util.Assert;

public class NewTag {
    private long userId;
    private String name;

    public NewTag(long userId, String name) {
        Assert.notNull(name, "name must be not null");
        Assert.isTrue(name.length() <= 20, "tag name must be less than or equal to 20 characters");

        this.userId = userId;
        this.name = name;
    }

    public long getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

}
