import { authHttp, updateAccessToken } from './http';

// 실제 API 응답 구조
interface PopApiResponse {
  success: boolean;
  data: {
    countAppend: number;
    newToken: string;
    isProcessed: boolean;
    regionCode: string;
  };
  timestamp: string;
}

export interface PopResponse {
  countAppend: number;
  isProcessed: boolean;
  regionCode: string;
}

export async function sendPop(count: number): Promise<PopResponse> {
  const res = await authHttp
    .post('api/v1/pop', { searchParams: { count } })
    .json<PopApiResponse>();

  // 매 pop 응답마다 새 토큰 갱신
  if (res.data?.newToken) {
    updateAccessToken(res.data.newToken);
  }

  return {
    countAppend: res.data.countAppend,
    isProcessed: res.data.isProcessed,
    regionCode: res.data.regionCode,
  };
}
