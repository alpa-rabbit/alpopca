import { authHttp as http } from './http';

export interface PopResponse {
  count: number;
  regionCode: string;
}

export async function sendPop(count: number): Promise<PopResponse> {
  return http.post('api/v1/pop', { searchParams: { count } }).json<PopResponse>();
}
