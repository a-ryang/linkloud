package io.linkloud.api.link.domain;

import io.linkloud.api.common.service.port.ClockHolder;
import io.linkloud.api.user.domain.User;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class Link {

    private Long id;
    private Long userId;
    private Long collectionId;
    private String url;
    private String name;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;

    // TODO :  수정,삭제 시간, collectionId = Null 임
    public static Link from(LinkCreate linkCreate, User user, ClockHolder clockHolder) {
        return Link.builder()
            .userId(user.getId())
            .collectionId(null)
            .url(linkCreate.getUrl())
            .name(linkCreate.getName())
            .description(linkCreate.getDescription())
            .createdAt(clockHolder.getCurrentTime())
            .updatedAt(clockHolder.getCurrentTime())
            .deletedAt(null)
            .build();
    }


}
