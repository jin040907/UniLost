# Render 배포 문제 해결 가이드

## 502 Bad Gateway 에러 해결 방법

### 1. 로그 확인
Render 대시보드에서 **Logs** 탭을 확인하세요:
- 빌드 로그에서 에러 확인
- 런타임 로그에서 서버 시작 에러 확인

### 2. 주요 원인 및 해결책

#### 문제 1: better-sqlite3 빌드 실패
**증상**: 빌드 중 네이티브 모듈 컴파일 에러

**해결책**:
- Render는 자동으로 빌드하지만, 필요시 빌드 명령어 확인
- `package.json`에 `engines` 필드 추가 권장

#### 문제 2: 포트 설정 문제
**증상**: 서버가 시작되지 않음

**해결책**:
- ✅ 이미 `process.env.PORT` 사용 중 (정상)
- Render가 자동으로 PORT 환경변수 설정

#### 문제 3: 데이터베이스 파일 경로 문제
**증상**: 데이터베이스 파일을 찾을 수 없음

**해결책**:
- ✅ 현재 코드는 `__dirname` 사용 (정상)
- Render의 영구 디스크 사용 고려 (유료 플랜)

#### 문제 4: 서버 시작 실패
**증상**: 서버가 응답하지 않음

**해결책**:
- 서버 시작 시 에러 핸들링 추가됨 ✅
- 로그에서 정확한 에러 메시지 확인

### 3. Render 설정 확인

#### 필수 설정:
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Environment**: `Node`
- **Node Version**: 18 이상 권장

#### 환경변수:
- `NODE_ENV`: `production`
- `SESSION_SECRET`: 자동 생성됨 (render.yaml 설정)

### 4. 디버깅 단계

1. **로컬에서 테스트**
   ```bash
   NODE_ENV=production node server.js
   ```

2. **빌드 로그 확인**
   - Render 대시보드 → Logs → Build Logs
   - 에러 메시지 확인

3. **런타임 로그 확인**
   - Render 대시보드 → Logs → Runtime Logs
   - 서버 시작 메시지 확인

4. **Health Check 확인**
   - `render.yaml`에 `healthCheckPath: /` 설정됨
   - 서버가 `/` 경로에 응답하는지 확인

### 5. 일반적인 해결 방법

#### 방법 1: 재배포
- Render 대시보드에서 "Manual Deploy" 클릭
- 최신 커밋으로 재배포

#### 방법 2: 환경변수 확인
- Render 대시보드 → Environment
- `PORT`가 자동 설정되어 있는지 확인
- `SESSION_SECRET`이 설정되어 있는지 확인

#### 방법 3: Node 버전 확인
- `package.json`에 `engines` 필드 추가:
  ```json
  "engines": {
    "node": ">=18.0.0"
  }
  ```

### 6. 로그에서 확인할 메시지

**정상 시작 시:**
```
✅ 데이터베이스 연결 성공
✅ 데이터베이스 초기화 완료
🚀 Server running on http://localhost:XXXX
```

**에러 발생 시:**
```
❌ 데이터베이스 연결 실패: [에러 메시지]
❌ 서버 에러: [에러 메시지]
```

### 7. 추가 확인사항

- [ ] GitHub 저장소가 올바르게 연결되었는지
- [ ] `render.yaml` 파일이 저장소 루트에 있는지
- [ ] `package.json`의 `start` 스크립트가 올바른지
- [ ] 모든 의존성이 `package.json`에 있는지

### 8. 여전히 문제가 있다면

1. Render 지원팀에 문의 (로그 첨부)
2. 로컬에서 `NODE_ENV=production npm start` 실행하여 테스트
3. 간단한 테스트 서버로 배포하여 기본 설정 확인

