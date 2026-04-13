# Technical Documentation: sRPG Career Exploration System

본 문서는 sRPG 커리어 진단 서비스의 시스템 아키텍처, 데이터 흐름, 그리고 주요 기술적 구현 상세를 설명합니다.

## 1. 기술 스택 (Technology Stack)

*   **Frontend**: React 19, TypeScript, Vite
*   **Styling**: Tailwind CSS 4, Framer Motion (애니메이션)
*   **Backend/BaaS**: Firebase (Authentication, Firestore)
*   **AI Engine**: Google Gemini 1.5 Flash (via @google/genai)
*   **Data Visualization**: Recharts (RIASEC 레이더 차트)
*   **Icons**: Lucide React

## 2. 시스템 아키텍처 (System Architecture)

### 2.1 데이터 흐름 (Data Flow)
1.  **Auth**: Google OAuth 또는 익명 로그인(Anonymous Auth)을 통한 사용자 식별 및 Firestore `users` 컬렉션 프로필 동기화. 익명 계정은 `linkWithPopup`을 통해 구글 계정으로 업그레이드 가능.
2.  **Assessment**: 12개의 정적 문항(RIASEC) 응답 데이터를 수집.
3.  **AI Generation**: 수집된 RIASEC 점수와 사용자 선호도(미디어 타입)를 Gemini API에 전달하여 개인화된 '세계관'과 '심화 퀘스트' 생성.
4.  **Scoring**: 모든 선택 데이터를 합산하여 최종 RIASEC 프로필 산출.
5.  **Matching**: O*NET 기반 직업 데이터셋과 사용자의 RIASEC 벡터 거리를 계산하여 최적 직업 매칭.
6.  **Reporting**: 최종 데이터를 바탕으로 AI가 서사형 리포트 및 3단계 로드맵 생성.
7.  **History**: 사용자의 모든 진단 세션은 Firestore `sessions` 컬렉션에 저장되며, 메인 화면의 '이전 진단 기록 보기'를 통해 다시 열람 가능.

## 3. 주요 모듈 구현 상세 (Implementation Details)

### 3.1 AI 엔진 (src/lib/ai.ts)
*   **모델**: `gemini-1.5-flash` (속도와 비용 효율성 최적화)
*   **구조**: `systemInstruction`을 통해 페르소나(베테랑 멘토)를 부여하고, `responseSchema`를 사용하여 엄격한 JSON 출력을 보장합니다.
*   **보안**: `VITE_GEMINI_API_KEY` 환경 변수를 통해 키를 관리하며, 클라이언트 사이드 노출을 방지하기 위한 구조를 갖추고 있습니다.

### 3.2 데이터베이스 (src/lib/firebase.ts)
*   **Firestore**: `users`(프로필), `sessions`(진단 결과), `careers`(직업 데이터) 컬렉션으로 구성.
*   **Security Rules**: `firestore.rules`를 통해 본인의 데이터만 읽고 쓸 수 있도록 보안 규칙이 적용되어 있습니다.

### 3.3 직업 매칭 알고리즘 (src/lib/matching.ts)
*   사용자의 RIASEC 6차원 벡터와 각 직업의 RIASEC 벡터 간의 유사도를 계산합니다.
*   단순 점수 일치가 아닌, 상위 특성의 가중치를 고려한 매칭 로직이 적용되어 있습니다.

## 4. 환경 변수 설정 (Environment Variables)

Vercel 등 배포 환경에서 다음 변수 설정이 필수적입니다:

```env
VITE_GEMINI_API_KEY=        # Gemini API Key
VITE_FIREBASE_API_KEY=      # Firebase API Key
VITE_FIREBASE_AUTH_DOMAIN=  # Firebase Auth Domain
VITE_FIREBASE_PROJECT_ID=   # Firebase Project ID
VITE_FIRESTORE_DATABASE_ID= # Firestore Database ID (Enterprise 기준)
```

## 5. 유지보수 및 확장 가이드

*   **문항 추가**: `src/data/events.ts`에 교육 수준별 이벤트를 추가하여 진단 범위를 확장할 수 있습니다.
*   **직업 데이터 업데이트**: `src/data/careers.ts`를 수정하거나 `handleSync` 기능을 통해 Firestore에 최신 데이터를 동기화할 수 있습니다.
*   **디자인 커스텀**: `tailwind.config.js` 및 `src/index.css`를 통해 브랜드 컬러와 테마를 변경할 수 있습니다.

---
**Author**: sang-mil
**Last Updated**: 2026-04-12
