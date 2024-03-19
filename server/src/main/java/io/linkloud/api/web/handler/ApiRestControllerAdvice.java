package io.linkloud.api.web.handler;

import io.linkloud.api.error.BusinessException;
import io.linkloud.api.error.ErrorType;
import io.linkloud.api.web.dto.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@Slf4j
@RestControllerAdvice
public class ApiRestControllerAdvice {

    @ExceptionHandler(BusinessException.class)
    protected ResponseEntity<ApiResponse<Void>> handleBusinessException(BusinessException exception) {
        if (exception.isNecessaryToLog()) {
            log.error("[BusinessException] {}", exception.getMessage(), exception);
        }

        return ResponseEntity
            .status(exception.getHttpStatus())
            .body(ApiResponse.fail(exception.getErrorCode(), exception.getMessage()));
    }

    @ExceptionHandler({
        IllegalArgumentException.class,                // 메서드에 전달된 잘못된 인자
        MethodArgumentNotValidException.class,         // @Valid 어노테이션
        MissingServletRequestParameterException.class, // 필수 요청 파라미터가 누락(쿼리파라미터, 폼데이터)
        MethodArgumentTypeMismatchException.class,     // 파라미터의 타입이 메서드의 파라미터 타입과 일치하지 않을 때
        HttpMessageNotReadableException.class,         // 요청 본문을 파싱할 수 없거나 잘못된 형식의 데이터가 요청 본문에 포함되어 있을 때
        HttpMediaTypeNotSupportedException.class,      // 요청한 미디어 타입(Content-Type)이 서버가 지원하지 않을 때
        HttpMediaTypeNotAcceptableException.class,     // 서버가 해당 미디어 타입으로 응답을 생성할 수 없을 때
        BindException.class                            // 폼 객체를 모델 객체에 바인딩 할 때(폼 데이터의 바인딩 과정에서 유효성 검사 실패나 타입 불일치 등)
    })
    protected ApiResponse<Void> handleBadRequest(Exception exception) {
        log.info("[BadRequest] {}", exception.getMessage(), exception);
        return ApiResponse.fail(ErrorType.BAD_REQUEST.getCode(), ErrorType.BAD_REQUEST.getMessage());
    }

    @ExceptionHandler(Exception.class)
    protected ApiResponse<Void> handleException(Exception exception) {
        log.error("[Exception] {}", exception.getMessage(), exception);
        return ApiResponse.fail(ErrorType.INTERNAL_SERVER_ERROR.getCode(), ErrorType.INTERNAL_SERVER_ERROR.getMessage());
    }

}
