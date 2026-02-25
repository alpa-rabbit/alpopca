import ky from 'ky';

const rawBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const BASE_URL = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

// 인증 없이 공개 API 호출 (leaderboard 등)
export const http = ky.create({
  prefixUrl: BASE_URL,
});

// 토큰 기반 인증 API 호출 (pop 등)
let accessToken: string | null = null;
let tokenExpiry: number | null = null;
let tokenFetchFailed = false;

async function fetchToken(): Promise<string | null> {
  if (tokenFetchFailed) return null;
  try {
    const raw = await ky.get(`${BASE_URL}api/v1/auth/token`).text();
    let token: string;
    try {
      const json = JSON.parse(raw) as Record<string, unknown>;
      const candidate = json['token'] ?? json['accessToken'];
      token = typeof candidate === 'string' ? candidate : raw;
    } catch {
      token = raw.trim();
    }
    accessToken = token;
    try {
      const payload = JSON.parse(atob(token.split('.')[1])) as { exp?: number };
      tokenExpiry = payload.exp ?? null;
    } catch {
      tokenExpiry = null;
    }
    return token;
  } catch {
    tokenFetchFailed = true;
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
