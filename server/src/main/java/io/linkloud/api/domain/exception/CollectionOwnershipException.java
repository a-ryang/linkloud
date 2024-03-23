package io.linkloud.api.domain.exception;

import io.linkloud.api.shared.exception.BusinessException;
import org.springframework.http.HttpStatus;

public class CollectionOwnershipException extends BusinessException {

    public CollectionOwnershipException(long userId) {
        super(String.format("user %d does not own the collection.", userId));
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.FORBIDDEN;
    }

    @Override
    public String getErrorCode() {
        return "COLLECTION_403";
    }

    @Override
    public boolean isNecessaryToLog() {
        return false;
    }
}