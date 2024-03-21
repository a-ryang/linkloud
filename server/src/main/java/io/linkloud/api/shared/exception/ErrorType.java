package io.linkloud.api.shared.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorType {

    INTERNAL_SERVER_ERROR("E_500", "Internal server error"),

    BAD_REQUEST("E_400", "Bad request"),
    UNAUTHORIZED("E_401", "Requires authentication"),
    FORBIDDEN("E_403", "Forbidden"),
    NOT_FOUND("E_404", "Not found"),
    CONFLICT("E_409", "Conflict");

    private final String code;
    private final String message;

}
