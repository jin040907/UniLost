# 데이터베이스 마이그레이션 가이드

## SQLite → PostgreSQL 마이그레이션

Render 무료 플랜에서는 SQLite가 적합하지 않습니다. PostgreSQL로 마이그레이션하는 것을 권장합니다.

## 무료 PostgreSQL 옵션

### 1. Supabase (추천 ⭐)
- **무료 플랜**: 500MB 저장공간, 무제한 API 요청
- **URL**: https://supabase.com
- **설정**: 매우 간단, 자동 백업

### 2. Neon
- **무료 플랜**: 3GB 저장공간
- **URL**: https://neon.tech
- **설정**: 간단

### 3. Railway
- **무료 플랜**: $5 크레딧/월
- **URL**: https://railway.app
- **설정**: 간단

## Supabase로 마이그레이션하기

### 1. Supabase 프로젝트 생성
1. https://supabase.com 접속
2. "New Project" 클릭
3. 프로젝트 이름 입력
4. 데이터베이스 비밀번호 설정
5. Region 선택 (가장 가까운 지역)

### 2. 연결 정보 확인
Supabase 대시보드 → Settings → Database에서:
- Connection string (URI) 복사
- 예: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`

### 3. 환경변수 설정
Render 대시보드 → Environment에서 추가:
```
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
```

### 4. 코드 변경
`db.js`를 PostgreSQL용으로 변경 (아래 참고)

## PostgreSQL 마이그레이션 코드

`pg` 패키지를 사용하여 PostgreSQL로 전환:

```bash
npm install pg
```

`db.js`를 PostgreSQL용으로 변경하면 됩니다.

## Render Disk 사용 (유료 플랜)

유료 플랜을 사용한다면 Render Disk를 사용할 수 있습니다:
1. Render 대시보드 → Disk 탭
2. 새 디스크 생성
3. 디스크 경로에 데이터베이스 파일 저장

하지만 무료 플랜에서는 PostgreSQL 사용을 강력히 권장합니다.

