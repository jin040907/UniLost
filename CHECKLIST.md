# GitHub 업로드 전 체크리스트

## ✅ 완료된 항목

### 코드 품질
- [x] 린터 에러 없음 확인
- [x] 문맥 오류 없음 확인
- [x] 보안 문제 해결 (환경변수 사용)

### 파일 관리
- [x] `.gitignore` 설정 완료 (node_modules, .db 파일 등)
- [x] 불필요한 파일 제외 (test.html 등)
- [x] README.md 작성 완료

### 배포 준비
- [x] `render.yaml` 배포 설정 파일 생성
- [x] `DEPLOY.md` 배포 가이드 작성
- [x] 환경변수 지원 추가

### 코드 개선
- [x] 디버깅 로그를 개발 모드에서만 출력하도록 개선
- [x] package.json 메타데이터 개선

## 📝 주의사항

### GitHub에 업로드하기 전
1. **데이터베이스 파일 제외 확인**
   - `unilost.db`는 `.gitignore`에 포함되어 있어 자동 제외됨 ✅

2. **환경변수 설정**
   - 배포 시 `SESSION_SECRET` 환경변수 설정 필요
   - Render에서는 자동 생성됨

3. **기본 계정 정보**
   - 기본 계정은 개발용이므로 운영 환경에서는 변경 권장
   - 학생: `student1` / `1234`
   - 관리자: `admin1` / `admin123`

### 업로드 후 확인사항
- [ ] GitHub 저장소에 모든 파일이 올라갔는지 확인
- [ ] `.db` 파일이 제외되었는지 확인
- [ ] `node_modules`가 제외되었는지 확인

## 🚀 배포 방법

1. GitHub에 코드 업로드
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin [your-repo-url]
   git push -u origin main
   ```

2. Render에서 배포 (자동)
   - render.com 접속
   - GitHub 저장소 연결
   - 자동 배포 완료!

## 📚 참고 문서

- [README.md](./README.md) - 프로젝트 개요 및 사용법
- [DEPLOY.md](./DEPLOY.md) - 상세 배포 가이드

