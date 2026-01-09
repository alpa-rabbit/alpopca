import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      staleTime: 5_000, // 5초 동안은 fresh로 취급
    },
    mutations: {
      retry: 0,
    },
  },
});
