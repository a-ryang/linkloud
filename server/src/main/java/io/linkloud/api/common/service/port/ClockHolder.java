package io.linkloud.api.common.service.port;

import java.time.LocalDateTime;

public interface ClockHolder {
    LocalDateTime getCurrentTime();
}
