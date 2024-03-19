package io.linkloud.api.link.controller;

import io.linkloud.api.link.controller.response.LinkResponse;
import io.linkloud.api.link.domain.LinkCreate;
import io.linkloud.api.link.service.LinkService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1/links")
@RestController
@RequiredArgsConstructor
public class LinkController {

    private final LinkService linkService;

    @PostMapping
    public ResponseEntity<LinkResponse> create(@Valid @RequestBody LinkCreate linkCreate) {
        LinkResponse response = LinkResponse.from(linkService.create(linkCreate));
        return ResponseEntity.ok(response);
    }


}
