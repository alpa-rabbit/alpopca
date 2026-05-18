import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from './config.js';

/**
 * JWT 토큰 발급
 * @returns {string|null} accessToken 또는 실패 시 null
 */
export function getToken() {
  const res = http.get(`${BASE_URL}/api/v1/auth/token`);

  const success = check(res, {
    '[토큰 발급] 200 응답': (r) => r.status === 200,
    '[토큰 발급] 토큰 존재': (r) => {
      const body = JSON.parse(r.body);
      return body.success && body.data.accessToken;
    },
  });

  if (!success) return null;

  return JSON.parse(res.body).data.accessToken;
}

/**
 * 팝 제출
 * @param {string} token - JWT 토큰
 * @param {number} count - 팝 카운트
 * @returns {string|null} 갱신된 토큰 또는 실패 시 null
 */
export function submitPop(token, count) {
  const res = http.post(
    `${BASE_URL}/api/v1/pop?count=${count}`,
    null,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const success = check(res, {
    '[팝 제출] 200 응답': (r) => r.status === 200,
    '[팝 제출] 처리 완료': (r) => {
      const body = JSON.parse(r.body);
      return body.success && body.data.isProcessed;
    },
  });

  if (!success) return null;

  // 갱신된 토큰 반환
  return JSON.parse(res.body).data.newToken;
}

/**
 * 리더보드 조회
 */
export function getLeaderboard() {
  const res = http.get(`${BASE_URL}/api/v1/leaderboard`);

  check(res, {
    '[리더보드] 200 응답': (r) => r.status === 200,
    '[리더보드] 데이터 존재': (r) => {
      const body = JSON.parse(r.body);
      return body.success && body.data.regionRankList !== undefined;
    },
  });
}
