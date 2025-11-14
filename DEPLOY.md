# 웹 서비스 배포 가이드

## 무료 호스팅 옵션 (IP 주소 구매 불필요!)

### 1. **Render** (추천 ⭐)
- **무료 플랜**: 무료 (약간 느릴 수 있음)
- **장점**: 간단한 배포, 자동 HTTPS, SQLite 지원
- **URL**: https://render.com

**배포 방법:**
1. GitHub에 코드 업로드
2. Render에서 "New Web Service" 선택
3. GitHub 저장소 연결
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. 환경변수 PORT는 자동 설정됨

### 2. **Railway**
- **무료 플랜**: $5 크레딧/월 (충분함)
- **장점**: 매우 간단, 빠른 배포
- **URL**: https://railway.app

**배포 방법:**
1. GitHub에 코드 업로드
2. Railway에서 "New Project" → "Deploy from GitHub"
3. 자동으로 감지하고 배포

### 3. **Fly.io**
- **무료 플랜**: 무료 (제한적)
- **장점**: 전 세계 CDN, 빠름
- **URL**: https://fly.io

### 4. **Heroku** (유료 전환됨, 비추천)

## 배포 전 준비사항

### 1. 환경변수 설정
서버 코드에서 하드코딩된 secret을 환경변수로 변경 필요:

```javascript
// server.js에서
secret: process.env.SESSION_SECRET || 'demo-lost-and-found-secret'
```

### 2. 데이터베이스
- SQLite는 파일 기반이므로 호스팅 서비스에서 영구 저장소 설정 필요
- 또는 PostgreSQL 같은 클라우드 DB 사용 권장

### 3. 포트 설정
현재 코드는 이미 `process.env.PORT`를 사용하므로 문제없음 ✅

## 빠른 배포 (Render 예시)

1. **GitHub에 코드 업로드**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin [your-github-repo-url]
   git push -u origin main
   ```

2. **Render에서 배포**
   - render.com 접속 → 회원가입
   - "New +" → "Web Service"
   - GitHub 저장소 연결
   - 설정:
     - Name: unilost (원하는 이름)
     - Region: Singapore (한국에서 가까움)
     - Branch: main
     - Root Directory: (비워두기)
     - Build Command: `npm install`
     - Start Command: `node server.js`
   - "Create Web Service" 클릭

3. **완료!**
   - 자동으로 `https://your-app.onrender.com` URL 생성
   - 전 세계 어디서나 접속 가능!

## 주의사항

⚠️ **무료 플랜 제한:**
- Render: 15분간 요청 없으면 sleep (첫 요청 시 느림)
- Railway: 월 $5 크레딧 제한
- SQLite 파일은 일부 서비스에서 영구 저장 안 될 수 있음

💡 **해결책:**
- PostgreSQL 같은 클라우드 DB 사용 (Supabase, Neon 등 무료)
- 또는 유료 플랜 사용 ($7-10/월)

