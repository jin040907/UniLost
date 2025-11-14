# Render 데이터베이스 설정 가이드

Render에서 데이터베이스가 연동되지 않는 문제를 해결하는 방법입니다.

## 문제 원인

Render의 무료 플랜에서는 파일 시스템이 영구적이지 않아서 SQLite 파일이 사라질 수 있습니다. 따라서 PostgreSQL 데이터베이스를 사용해야 합니다.

## 해결 방법 1: Render에서 PostgreSQL 데이터베이스 생성 (추천)

### 1단계: PostgreSQL 데이터베이스 생성
1. Render 대시보드(https://dashboard.render.com) 접속
2. "New +" 버튼 클릭
3. "PostgreSQL" 선택
4. 설정 입력:
   - **Name**: `unilost-db` (원하는 이름)
   - **Database**: `unilost` (자동 생성됨)
   - **User**: `unilost_user` (자동 생성됨)
   - **Region**: `Singapore` (한국에서 가까움)
   - **PostgreSQL Version**: `16` (최신 버전)
   - **Plan**: `Free` (무료 플랜)
5. "Create Database" 클릭

### 2단계: 웹 서비스에 데이터베이스 연결
1. 웹 서비스(`unilost`) 페이지로 이동
2. "Environment" 탭 클릭
3. "Link Resource" 버튼 클릭
4. 위에서 생성한 PostgreSQL 데이터베이스(`unilost-db`) 선택
5. "Link" 클릭

**완료!** `DATABASE_URL` 환경변수가 자동으로 설정됩니다.

### 3단계: 재배포
- Render가 자동으로 재배포하거나
- "Manual Deploy" → "Deploy latest commit" 클릭

## 해결 방법 2: 외부 PostgreSQL 사용 (Supabase/Neon)

### Supabase 사용 (추천)
1. https://supabase.com 접속 및 프로젝트 생성
2. "Settings" → "Database" → "Connection string" (URI) 복사
3. Render 웹 서비스 → "Environment" → "Add Environment Variable"
4. Key: `DATABASE_URL`, Value: 복사한 연결 문자열 입력
5. 재배포

자세한 내용은 `POSTGRESQL_SETUP.md` 파일을 참고하세요.

## 확인 방법

배포 후 로그에서 다음 메시지를 확인하세요:
```
✅ PostgreSQL 연결 풀 생성 완료
✅ PostgreSQL 데이터베이스 초기화 완료
```

또는 브라우저 콘솔에서 API 호출이 성공하는지 확인하세요.

## 문제 해결

### 여전히 데이터베이스가 연동되지 않을 때
1. Render 로그 확인: 웹 서비스 → "Logs" 탭
2. `DATABASE_URL` 환경변수 확인: "Environment" 탭
3. 데이터베이스 서비스 상태 확인: PostgreSQL 서비스가 "Available" 상태인지 확인

### 연결 오류가 발생할 때
- 연결 문자열의 비밀번호가 올바른지 확인
- SSL 설정 확인 (대부분 `?sslmode=require` 필요)
- 데이터베이스 서비스가 실행 중인지 확인

