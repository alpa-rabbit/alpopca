// 테스트 대상 서버 설정
// 로컬 테스트: BASE_URL = 'http://localhost:50000'
// EC2 테스트:  BASE_URL = 'https://alpopca.world'
export const BASE_URL = __ENV.BASE_URL || 'https://alpopca.world';

// 팝 시나리오 설정
export const POPS_PER_CYCLE = 10;     // VU 1회 반복당 팝 요청 수
export const POP_COUNT = 100;          // 요청당 팝 카운트
export const THINK_TIME = 0.5;         // 요청 간 대기 시간(초) - 실제 사용자 시뮬레이션
