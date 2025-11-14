# UniLost - 교내 분실물 통합 관리 시스템

세종대학교 분실물 통합 관리 웹 애플리케이션입니다. 지도 기반 분실물 등록/검색, 실시간 채팅, 관리자 승인 시스템을 제공합니다.

## 🌐 라이브 데모

**배포된 웹사이트**: https://unilost.onrender.com

> ⚠️ Render 무료 플랜은 15분간 요청이 없으면 sleep 모드로 전환됩니다. 첫 접속 시 약간의 지연이 있을 수 있습니다.

## 주요 기능

- 🗺️ **지도 기반 분실물 등록/검색**: Leaflet 지도를 활용한 위치 기반 분실물 관리
- 💬 **실시간 채팅**: Socket.IO 기반 전역 채팅 및 항목별 스레드 채팅
- 👤 **사용자 인증**: 세션 기반 로그인/로그아웃 시스템
- 🔐 **관리자 기능**: 분실물 승인/거부, 보관 장소 관리
- 💾 **데이터 영구 저장**: PostgreSQL (배포) / SQLite (로컬 개발) 데이터베이스를 통한 데이터 보존
- 📱 **반응형 디자인**: 모바일/데스크톱 모두 지원

## 기술 스택

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (배포) / SQLite (로컬 개발)
- **Real-time**: Socket.IO
- **Frontend**: HTML, JavaScript, Tailwind CSS
- **Maps**: Leaflet.js, OpenStreetMap

## 설치 및 실행

### 요구사항

- Node.js 14 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/jin040907/UniLost.git
cd UniLost

# 의존성 설치
npm install
```

### 로컬 실행

```bash
# 서버 시작
npm start
# 또는
node server.js
```

서버가 실행되면 `http://localhost:3000`에서 접속할 수 있습니다.

### 기본 계정

- **학생 계정**: `student1` / `1234`
- **관리자 계정**: `admin1` / `admin123`

## 프로젝트 구조

```
.
├── server.js          # Express 서버 메인 파일
├── db.js             # PostgreSQL/SQLite 데이터베이스 모듈
├── unilost.html      # 프론트엔드 HTML 파일
├── package.json       # 프로젝트 의존성
├── render.yaml        # Render 배포 설정
└── DEPLOY.md         # 배포 가이드
```

## API 엔드포인트

### 인증
- `GET /api/me` - 현재 로그인한 사용자 정보
- `POST /api/login` - 로그인
- `POST /api/logout` - 로그아웃

### 분실물 항목
- `GET /api/items` - 모든 항목 조회 (쿼리: `?status=pending|approved`)
- `GET /api/items/:id` - 특정 항목 조회
- `POST /api/items` - 항목 등록 (로그인 필요)
- `PATCH /api/items/:id` - 항목 수정 (관리자만)
- `DELETE /api/items/:id` - 항목 삭제 (관리자만)

### Socket.IO 이벤트
- `chat:join` - 전역 채팅 참여
- `chat:send` - 전역 채팅 메시지 전송
- `thread:join` - 항목별 스레드 참여
- `thread:send` - 스레드 메시지 전송

## 데이터베이스 스키마

- **users**: 사용자 정보
- **items**: 분실물 항목
- **chat_messages**: 전역 채팅 메시지
- **thread_messages**: 항목별 스레드 메시지

## 배포

**현재 배포 상태**: ✅ [https://unilost.onrender.com](https://unilost.onrender.com)

웹 서비스로 배포하는 방법은 [DEPLOY.md](./DEPLOY.md)를 참고하세요.

### 빠른 배포 (Render)

1. GitHub에 코드 업로드
2. [Render](https://render.com)에서 "New Web Service" 선택
3. GitHub 저장소 연결
4. 자동 배포 완료!

### 배포된 서비스 정보

- **URL**: https://unilost.onrender.com
- **호스팅**: Render (무료 플랜)
- **데이터베이스**: PostgreSQL (Supabase)

## 환경변수

- `PORT`: 서버 포트 (기본값: 3000)
- `SESSION_SECRET`: 세션 시크릿 키 (운영환경 필수)
- `DATABASE_URL`: PostgreSQL 연결 문자열 (배포 시 필수)
  - 예: `postgresql://user:password@host:5432/database`
  - 없으면 로컬 개발용 SQLite 사용

## 라이선스

Apache License 2.0

자세한 내용은 [LICENSE](./LICENSE) 파일을 참고하세요.

## 개발자

세종대학교 오픈소스SW개론 프로젝트
