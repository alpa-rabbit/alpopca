package dev.gunn96.popcat.application;

import dev.gunn96.popcat.application.dto.PopCommand;
import dev.gunn96.popcat.domain.RegionStats;

public interface PopService {
    RegionStats addPops(PopCommand popCommand);
}
