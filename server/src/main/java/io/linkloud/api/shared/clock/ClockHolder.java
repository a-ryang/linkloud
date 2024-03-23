package io.linkloud.api.shared.clock;

import java.time.LocalDateTime;

public interface ClockHolder {
    LocalDateTime getCurrentTime();
}
