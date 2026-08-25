# 다듬이

상황과 말투에 맞게 문장을 자연스럽게 다듬어 주는 AI 메시지 도우미입니다.

## 현재 진행 상태

- 서비스 기획 완료
- 반응형 화면 구현 완료
- Python AI API 및 프론트 요청 연결 완료
- Gemini API 키 설정 및 배포 예정

## 기술 스택

- 프론트엔드: HTML, CSS, JavaScript
- 백엔드: Vercel Serverless Functions (Python)
- AI: Google Gemini API
- 배포: Vercel

## 환경 변수

`.env.example`을 참고해 로컬 및 Vercel에 다음 환경 변수를 설정합니다.

```env
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-3.1-flash-lite
```

실제 API 키는 코드나 GitHub 저장소에 올리지 않습니다.

프론트엔드는 API 키를 직접 사용하지 않고 `/api/rewrite`를 호출합니다. Python
함수가 환경 변수에서 키를 읽어 Gemini API에 요청한 뒤 결과만 반환합니다.

## VS Code에서 로컬 실행

1. 프로젝트 폴더를 VS Code로 엽니다.
2. `.env.local`에 `GEMINI_API_KEY`를 입력합니다.
3. `Command + Shift + B`를 누르고 `다듬이 실행`을 선택합니다.
4. 터미널에 표시되는 `http://127.0.0.1:4173/`을 엽니다.

처음 실행할 때만 필요한 Python 패키지를 자동으로 설치합니다. 서버를 종료하려면
실행 중인 터미널에서 `Control + C`를 누릅니다.

## 배포 URL

Vercel 배포 후 추가할 예정입니다.
