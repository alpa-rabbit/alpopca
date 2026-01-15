package dev.gunn96.popcat.application;

import dev.gunn96.popcat.application.dto.PopCommand;

public interface PopService {
    Long addPops(PopCommand popCommand);
}
