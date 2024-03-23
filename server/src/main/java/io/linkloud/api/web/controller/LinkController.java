package io.linkloud.api.web.controller;

import io.linkloud.api.domain.link.NewLink;
import io.linkloud.api.domain.link.Link;
import io.linkloud.api.web.controller.request.CreateLinkRequest;
import io.linkloud.api.domain.link.LinkService;
import io.linkloud.api.web.controller.response.LinkResponse;
import io.linkloud.api.web.response.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Link", description = "Link API")
@Validated
@RequestMapping("/api/links")
@RestController
public class LinkController {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private final LinkService service;

    public LinkController(LinkService service) {
        this.service = service;
    }

    @Operation(summary = "링크 등록", description = "콜렉션에 링크를 등록합니다")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ApiResponse<LinkResponse> create(
        @Valid
        @RequestBody
        CreateLinkRequest request) {
        log.debug("request {}", request);
        long tempUserId = 2L;
        NewLink newLink = request.toNewLink(tempUserId);
        Link link = service.create(tempUserId, newLink);
        return ApiResponse.success(new LinkResponse(link));
    }

}
