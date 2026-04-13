# sRPG Career Exploration System

AI 기반의 스토리텔링형 진로 탐색 애플리케이션입니다. 사용자의 선택과 선호도를 바탕으로 맞춤형 세계관을 생성하고, 몰입감 있는 퀘스트를 통해 최적의 커리어를 제안합니다.

## 🚀 서비스 플로우 (Service Flow)

1.  **온보딩 (Onboarding)**
    *   사용자의 교육 수준(초등, 중등, 고등, 대학/일반)을 선택합니다.
    *   선택한 수준에 따라 맞춤형 진단 문항이 제공됩니다.

2.  **초기 진단 (Initial Assessment)**
    *   12개의 상황별 문항을 통해 사용자의 RIASEC 성향을 1차 분석합니다.
    *   각 문항은 실제 생활에서 겪을 수 있는 상황들로 구성되어 자연스러운 선택을 유도합니다.

3.  **개인화 설정 (Preference Selection)**
    *   사용자가 선호하는 미디어 타입(영화, 게임, 소설 등)과 좋아하는 작품 제목을 입력합니다.
    *   이 데이터는 AI가 개인화된 세계관을 생성하는 데 사용됩니다.

4.  **세계관 생성 (World Generation)**
    *   Gemini AI가 사용자의 RIASEC 성향과 미디어 선호도를 결합하여 독특한 모험 세계를 창조합니다.

5.  **심화 퀘스트 (Refined Quest)**
    *   생성된 세계관 속에서 5개의 심화 문항을 수행합니다.
    *   사용자는 모험의 주인공이 되어 선택을 내리며, 이를 통해 더욱 정밀한 성향 분석이 이루어집니다.

6.  **결과 분석 및 리포트 (Analysis & Report)**
    *   **RIASEC 프로필**: 레이더 차트를 통해 6가지 성향 점수를 시각화합니다.
    *   **AI 전문가 리포트**: 10년 이상의 경력을 가진 베테랑 페르소나가 들려주는 심층 분석 리포트를 제공합니다.
    *   **커리어 매칭**: 수백 개의 직업 데이터셋 중 사용자에게 가장 적합한 직업들을 추천합니다.

7.  **커리어 로드맵 (Career Roadmap)**
    *   추천된 직업 중 하나를 선택하여 상세 정보를 확인하고, 3단계 맞춤형 성장 로드맵을 생성할 수 있습니다.
    *   생성된 로드맵은 마크다운(.md) 파일로 다운로드하여 소장할 수 있습니다.

## 🛠 시스템 아키텍처 (System Architecture)

*   **Frontend**: React, TypeScript, Vite
*   **Styling**: Tailwind CSS, Framer Motion (애니메이션)
*   **AI Engine**: Google Gemini API (@google/genai)
*   **Database/Auth**: Firebase Firestore, Firebase Authentication (Google Login)
*   **Data Visualization**: Recharts

## 📋 주요 업데이트 및 요청 사항 반영 내역

사용자의 피드백을 바탕으로 다음과 같은 기능들이 단계적으로 구현되었습니다:

1.  **진단 시스템 고도화**
    *   기본 진단 문항 수를 12개로 확대하여 정밀도 향상.
    *   심화 개인화 질문을 3개에서 5개로 확대.
    *   초등, 중등, 고등, 대학/일반 등 교육 수준별 맞춤형 이벤트 데이터 구축.

2.  **AI 리포트 및 콘텐츠 강화**
    *   10년 이상 경력의 베테랑 페르소나를 도입하여 스토리텔링 방식의 리포트 생성.
    *   3단계 맞춤형 커리어 로드맵 생성 및 마크다운(.md) 파일 다운로드 기능.
    *   사용자의 미디어 선호도(영화, 게임 등)를 반영한 개인화된 세계관 생성.

3.  **UI/UX 디자인 및 인터랙션 개선**
    *   BattleScreen의 선택 버튼에 호버 애니메이션, 펄스 효과, 시각적 인디케이터 적용.
    *   ResultScreen의 AI 리포트 레이아웃을 카드형으로 개편하여 가독성 및 텍스트 배치 최적화.
    *   전체적인 텍스트 배치와 디자인 톤앤매너를 자연스럽게 조정.

4.  **성능 및 안정성 최적화**
    *   비동기 처리 및 데이터 프리페칭(Prefetching)을 통한 리포트 생성 속도 개선.
    *   Firebase 인증 안정화 (팝업 취소 및 중복 요청 처리).

## 🔐 보안 및 환경 변수 설정 (Security & Environment Variables)

이 프로젝트는 보안을 위해 API 키와 민감한 설정을 환경 변수로 관리합니다. GitHub에 코드를 올리기 전 다음 사항을 확인하세요:

1.  **`.env` 파일**: 실제 API 키가 포함된 `.env` 파일은 절대 GitHub에 올리지 마세요. (`.gitignore`에 포함되어 있습니다.)
2.  **`firebase-applet-config.json`**: 현재 이 파일은 플레이스홀더(`YOUR_...`)로 채워져 있어 GitHub에 올려도 안전합니다.
3.  **배포 시 설정**: Vercel이나 Netlify 등 호스팅 서비스의 설정(Environment Variables) 메뉴에서 다음 변수들을 직접 입력해야 합니다:
    *   `VITE_GEMINI_API_KEY`: Gemini API 키
    *   `VITE_FIREBASE_API_KEY`: Firebase API 키
    *   `VITE_FIREBASE_AUTH_DOMAIN`: Firebase Auth 도메인
    *   `VITE_FIREBASE_PROJECT_ID`: Firebase 프로젝트 ID
    *   ... (기타 `.env.example`에 명시된 모든 `VITE_` 변수들)

로컬 개발 시에는 `.env.example` 파일을 복사하여 `.env` 파일을 만든 후 실제 값을 입력하여 사용하세요.

## 🛠 활용 AI 도구 (AI Tools Used)

본 서비스의 기획 및 개발 과정에서 다음 AI 도구들을 **무료 티어**로 활용하였습니다:

*   **시장 분석 및 데이터 서치**: [Perplexity](https://www.perplexity.ai/)
*   **UI 디자인**: [v0.dev](https://v0.dev/) (또는 Stitch/v0 등 UI 생성 도구)
*   **데이터 가공 및 정제**: [Claude](https://claude.ai/)
*   **메인 개발 및 로직 구현**: [Google AI Studio (Gemini)](https://aistudio.google.com/)

---

**Data Attribution:**
This product includes data from the O*NET Database (USDOL/ETA). This data has been modified.
