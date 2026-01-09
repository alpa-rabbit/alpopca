package dev.gunn96.popcat.application;

import dev.gunn96.popcat.domain.Pop;
import dev.gunn96.popcat.domain.vo.ClickCount;
import dev.gunn96.popcat.domain.vo.RegionCode;
import dev.gunn96.popcat.infrastructure.persistence.repository.RegionPopRepository;
import dev.gunn96.popcat.infrastructure.persistence.repository.VisitorPopRepository;
import dev.gunn96.popcat.infrastructure.security.jwt.JwtProvider;
import dev.gunn96.popcat.support.mapper.PopMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class PopServiceImpl implements PopService {
    private final VisitorPopRepository visitorPopRepository;
    private final RegionPopRepository regionPopRepository;
    private final JwtProvider jwtProvider;
    private final PopMapper popMapper;

    @Value("${popcat.max-pops-append-per-visitor:800}")
    private long maxPopsAppendPerVisitor;

    @Transactional
    @Override
    public Pop addPops(RegionCode regionCode,ClickCount clickCount) {
        updateRegionPop(regionCode, clickCount);
        return null;
    }


    // 지역 팝 업데이트
    private void updateRegionPop(RegionCode regionCode, ClickCount validCount) {
        Pop pop = regionPopRepository
                .findById(regionCode.getCode())
                .map(popMapper::from)
                .orElseThrow(EntityNotFoundException::new);

        Pop updatedPop = pop.addCount(regionCode, validCount);
        regionPopRepository.save(popMapper.toRegionEntity(updatedPop));
    }

}
