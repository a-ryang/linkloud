package io.linkloud.api.link.domain;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@ToString
@AllArgsConstructor
@Getter
public class LinkCreate {

    @NotBlank(message = "url must not be blank.")
    private String url;
    @NotBlank(message = "name must not be blank.")
    private String name;
    @NotBlank(message = "description must not be blank.")
    private String description;
    @NotEmpty(message = "userId must not be empty")
    private Long userId;


}
