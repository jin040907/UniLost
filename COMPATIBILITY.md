# 지원 운영체제 및 브라우저 호환성

## 지원 운영체제 (서버)

### 서버 실행 환경
UniLost 서버는 Node.js 기반이므로 다음 운영체제에서 실행 가능합니다:

- ✅ **Windows** 10 이상
- ✅ **macOS** 10.15 (Catalina) 이상
- ✅ **Linux** (Ubuntu 18.04+, Debian 10+, CentOS 7+ 등)

### 요구사항
- Node.js 18.0.0 이상 (권장: Node.js 20 LTS)
- npm 9.0.0 이상
- PostgreSQL (배포 시) 또는 SQLite (로컬 개발)

## 지원 브라우저 (클라이언트)

### 데스크톱 브라우저

| 브라우저 | 최소 버전 | 권장 버전 | 상태 |
|---------|----------|----------|------|
| **Chrome** | 90+ | 최신 버전 | ✅ 완전 지원 |
| **Firefox** | 88+ | 최신 버전 | ✅ 완전 지원 |
| **Safari** | 14+ | 최신 버전 | ✅ 완전 지원 |
| **Edge** | 90+ | 최신 버전 | ✅ 완전 지원 |
| **Opera** | 76+ | 최신 버전 | ✅ 완전 지원 |

### 모바일 브라우저

| 플랫폼 | 브라우저 | 최소 버전 | 상태 |
|--------|---------|----------|------|
| **iOS** | Safari | iOS 14+ | ✅ 완전 지원 |
| **iOS** | Chrome | 최신 버전 | ✅ 완전 지원 |
| **Android** | Chrome | 90+ | ✅ 완전 지원 |
| **Android** | Samsung Internet | 14+ | ✅ 완전 지원 |
| **Android** | Firefox | 88+ | ✅ 완전 지원 |

## 기술 스택별 호환성

### Frontend 기술
- **HTML5**: 모든 모던 브라우저 지원
- **ES6+ JavaScript**: Chrome 51+, Firefox 54+, Safari 10+, Edge 15+
- **Tailwind CSS**: 모든 모던 브라우저 지원
- **Fetch API**: Chrome 42+, Firefox 39+, Safari 10.1+, Edge 14+

### 지도 라이브러리
- **Leaflet.js 1.9.4**: 
  - Chrome 60+, Firefox 55+, Safari 11+, Edge 79+
  - 모바일: iOS Safari 11+, Android Chrome 60+

### 실시간 통신
- **Socket.IO 4.8.1**:
  - WebSocket 지원 브라우저 필요
  - Chrome 16+, Firefox 11+, Safari 7+, Edge 12+
  - 폴백: Long Polling (구형 브라우저)

## 기능별 호환성

### 완전 지원되는 기능
- ✅ 지도 표시 및 상호작용 (Leaflet)
- ✅ 실시간 채팅 (Socket.IO)
- ✅ 사용자 인증 및 세션 관리
- ✅ 반응형 디자인 (모바일/데스크톱)
- ✅ 파일 업로드 (이미지)
- ✅ 지오코딩 (주소 검색)

### 제한사항
- ⚠️ **구형 브라우저 (IE 11 이하)**: 지원하지 않음
- ⚠️ **오프라인 모드**: 지원하지 않음 (서버 연결 필요)
- ⚠️ **PWA 기능**: 현재 미구현

## 테스트 환경

### 검증된 환경
- ✅ Chrome 120+ (Windows, macOS, Android)
- ✅ Firefox 121+ (Windows, macOS, Android)
- ✅ Safari 17+ (macOS, iOS)
- ✅ Edge 120+ (Windows, macOS)
- ✅ 모바일 Safari (iOS 15+)
- ✅ 모바일 Chrome (Android 10+)

## 호환성 확인 방법

브라우저에서 다음 기능이 작동하는지 확인하세요:

1. **지도 로딩**: Leaflet 지도가 정상적으로 표시되는가?
2. **WebSocket 연결**: 실시간 채팅이 작동하는가?
3. **파일 업로드**: 이미지 업로드가 가능한가?
4. **반응형 레이아웃**: 모바일에서 UI가 정상적으로 표시되는가?

## 문제 해결

### 지도가 표시되지 않는 경우
- 브라우저 콘솔에서 CORS 에러 확인
- 네트워크 연결 확인
- Leaflet CSS/JS 로딩 확인

### 실시간 채팅이 작동하지 않는 경우
- WebSocket 지원 여부 확인
- 방화벽 설정 확인
- Socket.IO 연결 상태 확인

### 모바일에서 레이아웃이 깨지는 경우
- 브라우저 뷰포트 설정 확인
- Tailwind CSS 로딩 확인

## 참고 자료

- [Leaflet 브라우저 호환성](https://leafletjs.com/reference.html#browser-support)
- [Socket.IO 브라우저 지원](https://socket.io/docs/v4/client-installation/)
- [Node.js 플랫폼 지원](https://nodejs.org/en/about/platforms/)

