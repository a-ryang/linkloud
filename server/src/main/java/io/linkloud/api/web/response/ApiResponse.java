package io.linkloud.api.web.response;

public class ApiResponse<T> {

    private final String code;
    private final String message;
    private T data;

    private ApiResponse(String code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    /**
     * 성공응답
     * @return <code>new ApiResponse<>(null, null, data);</code>
     */
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(null, null, data);
    }

    /**
     * 실패응답
     * @param code     실패코드
     * @param message  실패메세지
     * @return <code>new ApiResponse<>(code, message, null);</code>
     */
    public static ApiResponse<Void> fail(String code, String message) {
        return new ApiResponse(code, message, null);
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public T getData() {
        return data;
    }

}
