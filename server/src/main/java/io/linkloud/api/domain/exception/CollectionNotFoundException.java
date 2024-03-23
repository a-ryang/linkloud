package io.linkloud.api.domain.exception;

import io.linkloud.api.shared.exception.BusinessException;
import org.springframework.http.HttpStatus;

public class CollectionNotFoundException extends BusinessException {

    public CollectionNotFoundException(long collectionId) {
        super(String.format("collection %d not found", collectionId));
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.NOT_FOUND;
    }

    @Override
    public String getErrorCode() {
        return "COLLECTION_404";
    }

    @Override
    public boolean isNecessaryToLog() {
        return false;
    }
}