# PostgreSQL 설정 가이드

## Supabase로 PostgreSQL 설정하기 (추천)

### 1. Supabase 프로젝트 생성
1. https://supabase.com 접속
2. "Start your project" 클릭
3. GitHub로 로그인
4. "New Project" 클릭
5. 프로젝트 정보 입력:
   - Name: unilost (원하는 이름)
   - Database Password: 강력한 비밀번호 설정 (저장해두세요!)
   - Region: Northeast Asia (Seoul) - 한국에서 가장 가까움
6. "Create new project" 클릭

### 2. 연결 정보 가져오기
1. 프로젝트 대시보드에서 "Settings" → "Database" 클릭
2. "Connection string" 섹션에서 "URI" 선택
3. 연결 문자열 복사:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
4. `[YOUR-PASSWORD]`를 실제 비밀번호로 교체

### 3. Render에 환경변수 추가
1. Render 대시보드 → Your Service → Environment
2. "Add Environment Variable" 클릭
3. Key: `DATABASE_URL`
4. Value: 위에서 복사한 연결 문자열 (비밀번호 포함)
5. "Save Changes" 클릭

### 4. 재배포
- Render가 자동으로 재배포하거나
- "Manual Deploy" 클릭

## Neon으로 PostgreSQL 설정하기

### 1. Neon 프로젝트 생성
1. https://neon.tech 접속
2. "Sign Up" 클릭
3. "Create a project" 클릭
4. 프로젝트 이름 입력
5. Region 선택 (가장 가까운 지역)
6. "Create project" 클릭

### 2. 연결 정보 가져오기
1. 프로젝트 대시보드에서 "Connection Details" 확인
2. 연결 문자열 복사:
   ```
   postgresql://user:password@host.neon.tech/database?sslmode=require
   ```

### 3. Render에 환경변수 추가
- 위와 동일한 방법으로 `DATABASE_URL` 추가

## 테스트

배포 후 로그에서 다음 메시지 확인:
```
✅ PostgreSQL 연결 풀 생성 완료
✅ PostgreSQL 데이터베이스 초기화 완료
```

## 주의사항

⚠️ **보안**
- `DATABASE_URL`에는 비밀번호가 포함되어 있으므로 절대 GitHub에 커밋하지 마세요
- Render의 환경변수로만 관리하세요

⚠️ **무료 플랜 제한**
- Supabase: 500MB 저장공간
- Neon: 3GB 저장공간
- 충분히 사용 가능합니다!

## 문제 해결

### 연결 실패 시
1. 연결 문자열의 비밀번호가 올바른지 확인
2. IP 화이트리스트 확인 (Supabase의 경우)
3. SSL 설정 확인 (대부분 `sslmode=require` 필요)

### 테이블이 생성되지 않을 때
- 로그에서 에러 메시지 확인
- 데이터베이스 권한 확인

