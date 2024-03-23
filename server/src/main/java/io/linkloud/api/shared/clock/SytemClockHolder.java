package io.linkloud.api.shared.clock;

import io.linkloud.api.shared.clock.ClockHolder;
import java.time.LocalDateTime;
import org.springframework.stereotype.Component;

@Component
public class SytemClockHolder implements ClockHolder {

    @Override
    public LocalDateTime getCurrentTime() {
        return LocalDateTime.now();
    }

}
