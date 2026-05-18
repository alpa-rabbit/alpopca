/**
 * Load Test - 단계별 부하 증가
 *
 * 목적: 서버가 버틸 수 있는 동시 사용자 수와 꺾이는 지점 탐색
 * 단계: 10 → 50 → 100 → 200 → 300 → 0
 * 총 소요: 약 16분
 *
 * 실행: k6 run k6/load-test.js
 * EC2: k6 run -e BASE_URL=https://alpopca.world k6/load-test.js
 * 결과 저장: k6 run --out json=k6/results/load-test-before.json k6/load-test.js
 */
import { sleep } from 'k6';
import { getToken, submitPop, getLeaderboard } from './helpers.js';
import { POPS_PER_CYCLE, POP_COUNT, THINK_TIME } from './config.js';

export const options = {
  stages: [
    // Ramp-up: 단계별 증가
    { duration: '1m', target: 10 },
    { duration: '2m', target: 10 },    // 10명 유지 (워밍업)

    { duration: '1m', target: 50 },
    { duration: '2m', target: 50 },    // 50명 유지

    { duration: '1m', target: 100 },
    { duration: '2m', target: 100 },   // 100명 유지

    { duration: '1m', target: 200 },
    { duration: '2m', target: 200 },   // 200명 유지

    { duration: '1m', target: 300 },
    { duration: '2m', target: 300 },   // 300명 유지 (한계 탐색)

    // Ramp-down
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<5000'],  // p95 5초 넘으면 심각
    http_req_failed: ['rate<0.1'],      // 에러율 10% 미만
  },
};

export default function () {
  // 1. 토큰 발급
  let token = getToken();
  if (!token) return;
  sleep(THINK_TIME);

  // 2. 팝 연타
  for (let i = 0; i < POPS_PER_CYCLE; i++) {
    const newToken = submitPop(token, POP_COUNT);
    if (newToken) token = newToken;
    sleep(THINK_TIME);
  }

  // 3. 리더보드 확인
  getLeaderboard();
  sleep(THINK_TIME);
}
