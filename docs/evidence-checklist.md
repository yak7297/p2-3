# 다듬이 제출 증빙 체크리스트

## 준비 완료 자료

| 필수 증빙 | 파일 | 확인 내용 |
| --- | --- | --- |
| 데스크톱 화면 | `docs/screenshots/desktop-home.png` | 1440×900 홈 화면, 메뉴와 서비스 소개 |
| 모바일 화면 | `docs/screenshots/mobile-home.png` | 390×844 반응형 홈 화면 |
| AI 기능 동작 | `docs/screenshots/ai-result.png` | 입력, 상황·말투 선택, Gemini 생성 결과 |
| AI 코딩 도구 사용 과정 | `docs/ai-coding-log.md` | 실제 요청과 구현·오류 해결 과정 요약 |
| 서비스 기획서 | `docs/service-plan.md` | 목적, 타겟, 섹션, 핵심 기능, AI 실패 처리 |

## 배포 후 마지막 확인

- [ ] Vercel 배포 URL에서 네 개 메뉴가 각 섹션으로 이동한다.
- [ ] Vercel 배포 URL에서 AI 결과가 생성된다.
- [ ] 모바일 브라우저에서 가로 스크롤이나 겹침이 없다.
- [ ] README의 Vercel URL을 실제 주소로 교체한다.
- [ ] README의 GitHub 저장소 URL을 실제 주소로 교체한다.
- [ ] 필요하면 동일한 구도로 배포 URL 화면을 다시 캡처한다.
- [ ] GitHub 저장소에 실제 API 키나 `.env.local`이 없는지 확인한다.

## 제출 패키지 구성

1. Vercel 배포 URL
2. GitHub 저장소 URL
3. `README.md`
4. `docs/service-plan.md`
5. `docs/screenshots/`의 화면 증빙 3장
6. `docs/ai-coding-log.md`

