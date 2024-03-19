package io.linkloud.api.common.infrastructure;

import io.linkloud.api.common.service.port.ClockHolder;
import java.time.LocalDateTime;
import org.springframework.stereotype.Component;

@Component
public class SytemClockHolder implements ClockHolder {

    @Override
    public LocalDateTime getCurrentTime() {
        return LocalDateTime.now();
    }

}
