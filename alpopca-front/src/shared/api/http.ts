import ky from 'ky';

const rawBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const BASE_URL = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

let accessToken: string | null = null;
let tokenExpiry: number | null = null;
let tokenPromise: Promise<string> | null = null;

async function doRefreshToken(): Promise<string> {
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
}

async function ensureToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (accessToken && tokenExpiry && tokenExpiry > now + 5) {
    return accessToken;
  }

  if (!tokenPromise) {
    tokenPromise = doRefreshToken().finally(() => {
      tokenPromise = null;
    });
  }

  return tokenPromise;
}

export const http = ky.create({
  prefixUrl: BASE_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = await ensureToken();
        request.headers.set('Authorization', `Bearer ${token}`);
      },
    ],
  },
});
