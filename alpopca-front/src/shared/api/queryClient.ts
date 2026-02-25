import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      staleTime: 20_000, // 20초 동안은 fresh로 취급 (leaderboard refetchInterval 30초에 맞춤)
    },
    mutations: {
      retry: 0,
    },
  },
});
