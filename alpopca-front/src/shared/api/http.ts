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
export function updateAccessToken(token: string) {
  accessToken = token;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      tokenExpiry = null;
      return;
    }
    const payload = JSON.parse(atob(parts[1])) as { exp?: number };
    tokenExpiry = payload.exp ?? null;
  } catch {
    tokenExpiry = null;
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
    tokenFetchFailedAt = null; // 성공 시 리셋
    updateAccessToken(token);
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
