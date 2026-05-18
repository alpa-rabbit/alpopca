/**
 * Endpoint Test - 개별 엔드포인트 성능 측정
 *
 * 목적: 각 API의 개별 성능 수치 확보 (Before 기준점)
 * 태그로 엔드포인트별 메트릭을 분리해서 볼 수 있음
 *
 * 실행: k6 run k6/endpoint-test.js
 * 결과 저장: k6 run --out json=k6/results/endpoint-test-before.json k6/endpoint-test.js
 */
import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { BASE_URL, POP_COUNT } from './config.js';

export const options = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '2m', target: 50 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {
  // 각 group별로 메트릭이 분리되어 리포트에 표시됨
  let token;

  group('GET /auth/token', () => {
    const res = http.get(`${BASE_URL}/api/v1/auth/token`, {
      tags: { endpoint: 'auth_token' },
    });
    check(res, { '200 응답': (r) => r.status === 200 });
    token = JSON.parse(res.body).data.accessToken;
  });

  sleep(0.5);

  group('POST /pop', () => {
    if (!token) return;
    const res = http.post(
      `${BASE_URL}/api/v1/pop?count=${POP_COUNT}`,
      null,
      {
        headers: { Authorization: `Bearer ${token}` },
        tags: { endpoint: 'pop' },
      }
    );
    check(res, { '200 응답': (r) => r.status === 200 });

    if (res.status === 200) {
      token = JSON.parse(res.body).data.newToken;
    }
  });

  sleep(0.5);

  group('GET /leaderboard', () => {
    const res = http.get(`${BASE_URL}/api/v1/leaderboard`, {
      tags: { endpoint: 'leaderboard' },
    });
    check(res, { '200 응답': (r) => r.status === 200 });
  });

  sleep(0.5);
}
