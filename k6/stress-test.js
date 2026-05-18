/**
 * Stress Test - 한계점 돌파 테스트
 *
 * 목적: 서버가 완전히 무너지는 지점 확인 + 회복 능력 검증
 * 단계: 100 → 300 → 500 → 300 → 100 (부하 감소 후 회복 확인)
 * 총 소요: 약 14분
 *
 * 실행: k6 run k6/stress-test.js
 * 결과 저장: k6 run --out json=k6/results/stress-test-before.json k6/stress-test.js
 */
import { sleep } from 'k6';
import { getToken, submitPop, getLeaderboard } from './helpers.js';
import { POPS_PER_CYCLE, POP_COUNT, THINK_TIME } from './config.js';

export const options = {
  stages: [
    // 빠르게 100명까지 올림
    { duration: '1m', target: 100 },
    { duration: '2m', target: 100 },

    // 한계 돌파
    { duration: '1m', target: 300 },
    { duration: '2m', target: 300 },

    // 최대 부하
    { duration: '1m', target: 500 },
    { duration: '2m', target: 500 },

    // 부하 감소 — 서버가 회복하는지 확인
    { duration: '1m', target: 300 },
    { duration: '2m', target: 300 },

    { duration: '1m', target: 100 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    // stress test는 실패를 기대하므로 threshold를 느슨하게
    http_req_duration: ['p(95)<10000'],
    http_req_failed: ['rate<0.3'],
  },
};

export default function () {
  let token = getToken();
  if (!token) return;
  sleep(THINK_TIME);

  for (let i = 0; i < POPS_PER_CYCLE; i++) {
    const newToken = submitPop(token, POP_COUNT);
    if (newToken) token = newToken;
    sleep(THINK_TIME);
  }

  getLeaderboard();
  sleep(THINK_TIME);
}
