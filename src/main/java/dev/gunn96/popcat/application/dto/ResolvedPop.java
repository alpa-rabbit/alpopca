package dev.gunn96.popcat.application.dto;

import dev.gunn96.popcat.domain.Region;
import dev.gunn96.popcat.domain.vo.IpAddress;
import dev.gunn96.popcat.domain.vo.PopCount;

public record ResolvedPop(Region region, PopCount popCount, IpAddress ipAddress) {
}
