import ky from 'ky';

const rawBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const BASE_URL = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

// 인증 없이 공개 API 호출 (leaderboard 등)
export const http = ky.create({
  prefixUrl: BASE_URL,
});

// 토큰 상태
let accessToken: string | null = null;
let tokenExpiry: number | null = null;
let tokenFetchFailedAt: number | null = null;
const TOKEN_RETRY_INTERVAL_MS = 30_000; // 30초 후 재시도

// pop API에서 newToken 갱신 시 사용
// expiresIn: JWT에 exp 필드 없을 경우 fallback (fetchToken에서 서버 응답값 전달)
export function updateAccessToken(token: string, expiresIn?: number) {
  accessToken = token;
  try {
    const parts = token.split('.');
    // JWT 형식 검증 (3파트 + base64url 문자 검증)
    if (parts.length !== 3 || !/^[A-Za-z0-9\-_]*$/.test(parts[1])) {
      tokenExpiry = expiresIn ? Math.floor(Date.now() / 1000) + expiresIn : null;
      return;
    }
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))) as { exp?: number };
    // JWT exp 우선, 없으면 서버가 내려준 expiresIn 사용
    tokenExpiry = payload.exp ?? (expiresIn ? Math.floor(Date.now() / 1000) + expiresIn : null);
  } catch {
    tokenExpiry = expiresIn ? Math.floor(Date.now() / 1000) + expiresIn : null;
  }
}

interface TokenApiResponse {
  success: boolean;
  data: {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
  };
}

async function fetchToken(): Promise<string | null> {
  // 실패한 적 있으면 일정 시간 후 재시도
  if (tokenFetchFailedAt !== null && Date.now() - tokenFetchFailedAt < TOKEN_RETRY_INTERVAL_MS) {
    return null;
  }
  try {
    const res = await ky.get(`${BASE_URL}api/v1/auth/token`).json<TokenApiResponse>();
    const token = res.data?.accessToken;
    if (!token) {
      tokenFetchFailedAt = Date.now();
      return null;
    }
    tokenFetchFailedAt = null;
    // expiresIn을 fallback으로 전달 (JWT exp 없는 경우 대비)
    updateAccessToken(token, res.data.expiresIn);
    return token;
  } catch {
    tokenFetchFailedAt = Date.now();
    return null;
  }
}

async function ensureToken(): Promise<string | null> {
  const now = Math.floor(Date.now() / 1000);
  if (accessToken && tokenExpiry && tokenExpiry > now + 5) {
    return accessToken;
  }
  return fetchToken();
}

export const authHttp = ky.create({
  prefixUrl: BASE_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = await ensureToken();
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
});
