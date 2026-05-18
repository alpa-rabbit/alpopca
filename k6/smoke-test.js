/**
 * Smoke Test - 기본 동작 확인
 *
 * 목적: 시나리오가 정상 동작하는지 확인 (부하 테스트 전 검증)
 * VU: 1명, 1분
 *
 * 실행: k6 run k6/smoke-test.js
 * EC2: k6 run -e BASE_URL=https://alpopca.world k6/smoke-test.js
 */
import { sleep } from 'k6';
import { getToken, submitPop, getLeaderboard } from './helpers.js';
import { POPS_PER_CYCLE, POP_COUNT, THINK_TIME } from './config.js';

export const options = {
  vus: 1,
  duration: '1m',
  thresholds: {
    http_req_failed: ['rate<0.01'],       // 에러율 1% 미만
    http_req_duration: ['p(95)<2000'],    // p95 응답시간 2초 미만
  },
};

export default function () {
  // 1. 토큰 발급
  let token = getToken();
  if (!token) return;
  sleep(THINK_TIME);

  // 2. 팝 연타 (토큰 갱신 포함)
  for (let i = 0; i < POPS_PER_CYCLE; i++) {
    const newToken = submitPop(token, POP_COUNT);
    if (newToken) token = newToken;
    sleep(THINK_TIME);
  }

  // 3. 리더보드 확인
  getLeaderboard();
  sleep(THINK_TIME);
}
