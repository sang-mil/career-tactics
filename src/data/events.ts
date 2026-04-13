import { GameEvent, EducationLevel } from '../types';

export const LEVEL_EVENTS: Record<EducationLevel, GameEvent[]> = {
  elementary: [
    {
      "event_id": "e1",
      "title": "새로운 놀이",
      "question": "새 놀이를 시작할 때 나는?",
      "options": [
        { "id": "A", "text": "바로 해본다", "traits": { "R": 3 } },
        { "id": "B", "text": "어떻게 하는지 본다", "traits": { "I": 3 } },
        { "id": "C", "text": "새로운 방법 생각", "traits": { "A": 3 } },
        { "id": "D", "text": "친구랑 같이 한다", "traits": { "S": 3 } },
        { "id": "E", "text": "내가 이끈다", "traits": { "E": 3 } },
        { "id": "F", "text": "순서 정한다", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "e2",
      "title": "도움의 손길",
      "question": "친구가 어려워하면?",
      "options": [
        { "id": "A", "text": "직접 도와준다", "traits": { "S": 3 } },
        { "id": "B", "text": "왜 어려운지 본다", "traits": { "I": 3 } },
        { "id": "C", "text": "다른 방법 알려준다", "traits": { "A": 3 } },
        { "id": "D", "text": "같이 해준다", "traits": { "R": 2 } },
        { "id": "E", "text": "힘내라고 한다", "traits": { "E": 2 } },
        { "id": "F", "text": "방법 정리해준다", "traits": { "C": 2 } }
      ]
    },
    {
      "event_id": "e3",
      "title": "문제 해결",
      "question": "문제가 생기면?",
      "options": [
        { "id": "A", "text": "직접 해결", "traits": { "R": 3 } },
        { "id": "B", "text": "이유 찾기", "traits": { "I": 3 } },
        { "id": "C", "text": "새 방법 생각", "traits": { "A": 3 } },
        { "id": "D", "text": "도움 요청", "traits": { "S": 2 } },
        { "id": "E", "text": "앞장서 해결", "traits": { "E": 2 } },
        { "id": "F", "text": "순서대로 해결", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "e4",
      "title": "모둠 활동",
      "question": "모둠 활동에서 나는?",
      "options": [
        { "id": "A", "text": "만드는 역할", "traits": { "R": 3 } },
        { "id": "B", "text": "조사하는 역할", "traits": { "I": 3 } },
        { "id": "C", "text": "아이디어 내기", "traits": { "A": 3 } },
        { "id": "D", "text": "친구 돕기", "traits": { "S": 3 } },
        { "id": "E", "text": "리더 하기", "traits": { "E": 3 } },
        { "id": "F", "text": "정리하기", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "e5",
      "title": "창작 시간",
      "question": "새로운 것을 만들 때?",
      "options": [
        { "id": "A", "text": "직접 만든다", "traits": { "R": 3 } },
        { "id": "B", "text": "먼저 생각", "traits": { "I": 3 } },
        { "id": "C", "text": "창의적으로", "traits": { "A": 3 } },
        { "id": "D", "text": "친구랑 같이", "traits": { "S": 2 } },
        { "id": "E", "text": "내가 정함", "traits": { "E": 2 } },
        { "id": "F", "text": "계획부터", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "e6",
      "title": "시간 관리",
      "question": "시간이 부족하면?",
      "options": [
        { "id": "A", "text": "빨리 한다", "traits": { "R": 3 } },
        { "id": "B", "text": "방법 생각", "traits": { "I": 2 } },
        { "id": "C", "text": "다른 방법", "traits": { "A": 2 } },
        { "id": "D", "text": "도움 요청", "traits": { "S": 2 } },
        { "id": "E", "text": "이끈다", "traits": { "E": 2 } },
        { "id": "F", "text": "정리한다", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "e7",
      "title": "놀이 시간",
      "question": "친구와 놀 때?",
      "options": [
        { "id": "A", "text": "몸으로 놀기", "traits": { "R": 3 } },
        { "id": "B", "text": "생각 게임", "traits": { "I": 3 } },
        { "id": "C", "text": "창의 놀이", "traits": { "A": 3 } },
        { "id": "D", "text": "함께 협력", "traits": { "S": 3 } },
        { "id": "E", "text": "주도하기", "traits": { "E": 2 } },
        { "id": "F", "text": "규칙 지키기", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "e8",
      "title": "실수와 배움",
      "question": "실수했을 때?",
      "options": [
        { "id": "A", "text": "다시 해본다", "traits": { "R": 2 } },
        { "id": "B", "text": "왜 틀렸나", "traits": { "I": 3 } },
        { "id": "C", "text": "다른 방법", "traits": { "A": 2 } },
        { "id": "D", "text": "도움 받기", "traits": { "S": 2 } },
        { "id": "E", "text": "다시 시도", "traits": { "E": 2 } },
        { "id": "F", "text": "정리한다", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "e9",
      "title": "발표 시간",
      "question": "발표할 때?",
      "options": [
        { "id": "A", "text": "직접 보여준다", "traits": { "R": 2 } },
        { "id": "B", "text": "설명한다", "traits": { "I": 2 } },
        { "id": "C", "text": "재미있게", "traits": { "A": 3 } },
        { "id": "D", "text": "친구 소개", "traits": { "S": 2 } },
        { "id": "E", "text": "앞에서 말함", "traits": { "E": 3 } },
        { "id": "F", "text": "정리 발표", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "e10",
      "title": "선생님의 질문",
      "question": "선생님이 질문하면?",
      "options": [
        { "id": "A", "text": "해본다", "traits": { "R": 2 } },
        { "id": "B", "text": "생각한다", "traits": { "I": 3 } },
        { "id": "C", "text": "다르게 답함", "traits": { "A": 2 } },
        { "id": "D", "text": "친구랑 상의", "traits": { "S": 2 } },
        { "id": "E", "text": "손들고 발표", "traits": { "E": 3 } },
        { "id": "F", "text": "정리 후 답", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "e11",
      "title": "약속과 규칙",
      "question": "규칙이 있을 때?",
      "options": [
        { "id": "A", "text": "바로 따른다", "traits": { "C": 3 } },
        { "id": "B", "text": "왜 있는지", "traits": { "I": 2 } },
        { "id": "C", "text": "새 규칙 생각", "traits": { "A": 2 } },
        { "id": "D", "text": "같이 지킨다", "traits": { "S": 2 } },
        { "id": "E", "text": "정한다", "traits": { "E": 2 } },
        { "id": "F", "text": "직접 해본다", "traits": { "R": 2 } }
      ]
    },
    {
      "event_id": "e12",
      "title": "마지막 선택",
      "question": "마지막 선택!",
      "options": [
        { "id": "A", "text": "더 해본다", "traits": { "R": 3 } },
        { "id": "B", "text": "더 알아본다", "traits": { "I": 3 } },
        { "id": "C", "text": "새로운 시도", "traits": { "A": 3 } },
        { "id": "D", "text": "함께 한다", "traits": { "S": 2 } },
        { "id": "E", "text": "앞장선다", "traits": { "E": 3 } },
        { "id": "F", "text": "정리한다", "traits": { "C": 3 } }
      ]
    }
  ],
  middle: [
    {
      "event_id": "m1",
      "title": "동아리 선택",
      "question": "자유학기제 동아리를 고른다면?",
      "options": [
        { "id": "A", "text": "로봇 제작반", "traits": { "R": 3 } },
        { "id": "B", "text": "과학 탐구반", "traits": { "I": 3 } },
        { "id": "C", "text": "연극 영화반", "traits": { "A": 3 } },
        { "id": "D", "text": "또래 상담반", "traits": { "S": 3 } },
        { "id": "E", "text": "학생 자치회", "traits": { "E": 3 } },
        { "id": "F", "text": "도서 관리반", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "m2",
      "title": "수행평가 준비",
      "question": "수행평가 과제를 할 때 나는?",
      "options": [
        { "id": "A", "text": "직접 실험/제작", "traits": { "R": 3 } },
        { "id": "B", "text": "자료 조사/분석", "traits": { "I": 3 } },
        { "id": "C", "text": "독창적 표현", "traits": { "A": 3 } },
        { "id": "D", "text": "팀원 협력/지원", "traits": { "S": 3 } },
        { "id": "E", "text": "발표 주도/리드", "traits": { "E": 3 } },
        { "id": "F", "text": "계획 수립/정리", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "m3",
      "title": "진로 탐색",
      "question": "진로 캠프에서 가장 흥미로운 활동은?",
      "options": [
        { "id": "A", "text": "직업 체험 실습", "traits": { "R": 3 } },
        { "id": "B", "text": "전문가 강연 청취", "traits": { "I": 3 } },
        { "id": "C", "text": "미래 모습 상상하기", "traits": { "A": 3 } },
        { "id": "D", "text": "봉사 활동 체험", "traits": { "S": 3 } },
        { "id": "E", "text": "CEO 마인드 교육", "traits": { "E": 3 } },
        { "id": "F", "text": "적성 검사 결과 분석", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "m4",
      "title": "친구 관계",
      "question": "친구들 사이에서 나의 역할은?",
      "options": [
        { "id": "A", "text": "운동/활동 제안자", "traits": { "R": 2 } },
        { "id": "B", "text": "고민 해결사(논리)", "traits": { "I": 2 } },
        { "id": "C", "text": "분위기 메이커", "traits": { "A": 2 } },
        { "id": "D", "text": "다정한 경청자", "traits": { "S": 3 } },
        { "id": "E", "text": "모임 주동자", "traits": { "E": 3 } },
        { "id": "F", "text": "약속 장소/시간 정리", "traits": { "C": 2 } }
      ]
    },
    {
      "event_id": "m5",
      "title": "학습 스타일",
      "question": "시험 공부를 할 때 나는?",
      "options": [
        { "id": "A", "text": "문제 풀이 위주", "traits": { "R": 2 } },
        { "id": "B", "text": "원리 이해 중심", "traits": { "I": 3 } },
        { "id": "C", "text": "나만의 암기법 개발", "traits": { "A": 2 } },
        { "id": "D", "text": "친구와 스터디", "traits": { "S": 2 } },
        { "id": "E", "text": "목표 점수 내기", "traits": { "E": 2 } },
        { "id": "F", "text": "플래너 꼼꼼히 작성", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "m6",
      "title": "봉사활동",
      "question": "주말 봉사활동을 간다면 어떤 일을 하고 싶나요?",
      "options": [
        { "id": "A", "text": "시설 보수 및 청소", "traits": { "R": 3 } },
        { "id": "B", "text": "환경 실태 조사", "traits": { "I": 3 } },
        { "id": "C", "text": "벽화 그리기/공연", "traits": { "A": 3 } },
        { "id": "D", "text": "아이들 학습 지도", "traits": { "S": 3 } },
        { "id": "E", "text": "봉사 팀장/기획", "traits": { "E": 3 } },
        { "id": "F", "text": "물품 분류 및 기록", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "m7",
      "title": "과학의 날",
      "question": "과학의 날 행사에서 가장 참여하고 싶은 종목은?",
      "options": [
        { "id": "A", "text": "물로켓 발사 대회", "traits": { "R": 3 } },
        { "id": "B", "text": "과학 원리 탐구 토론", "traits": { "I": 3 } },
        { "id": "C", "text": "상상화 그리기", "traits": { "A": 3 } },
        { "id": "D", "text": "과학 도우미 활동", "traits": { "S": 2 } },
        { "id": "E", "text": "발명품 홍보/발표", "traits": { "E": 2 } },
        { "id": "F", "text": "실험 보고서 정리", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "m8",
      "title": "학교 축제",
      "question": "축제 무대에 오른다면 어떤 역할을 맡고 싶나요?",
      "options": [
        { "id": "A", "text": "조명/음향 스태프", "traits": { "R": 3 } },
        { "id": "B", "text": "무대 연출 분석", "traits": { "I": 2 } },
        { "id": "C", "text": "댄스/노래 공연", "traits": { "A": 3 } },
        { "id": "D", "text": "대기실 친구 응원", "traits": { "S": 2 } },
        { "id": "E", "text": "사회자/MC", "traits": { "E": 3 } },
        { "id": "F", "text": "큐시트 및 일정 관리", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "m9",
      "title": "학급 회의",
      "question": "학급 회의에서 의견이 충돌할 때 나의 태도는?",
      "options": [
        { "id": "A", "text": "실행 가능한 대안 제시", "traits": { "R": 2 } },
        { "id": "B", "text": "논리적인 이유 분석", "traits": { "I": 3 } },
        { "id": "C", "text": "새로운 아이디어 제안", "traits": { "A": 3 } },
        { "id": "D", "text": "친구들의 마음 중재", "traits": { "S": 3 } },
        { "id": "E", "text": "결론을 이끌어냄", "traits": { "E": 3 } },
        { "id": "F", "text": "다수결 규칙 준수", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "m10",
      "title": "조별 과제",
      "question": "조별 과제에서 팀원이 참여하지 않는다면?",
      "options": [
        { "id": "A", "text": "내가 직접 다 해버린다", "traits": { "R": 2 } },
        { "id": "B", "text": "원인을 묻고 해결책 찾기", "traits": { "I": 2 } },
        { "id": "C", "text": "재미있는 참여 유도", "traits": { "A": 2 } },
        { "id": "D", "text": "따뜻하게 격려하고 돕기", "traits": { "S": 3 } },
        { "id": "E", "text": "단호하게 역할 분담", "traits": { "E": 3 } },
        { "id": "F", "text": "선생님께 규칙대로 보고", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "m11",
      "title": "새로운 취미",
      "question": "새로운 취미를 배운다면 어떤 것이 좋을까요?",
      "options": [
        { "id": "A", "text": "목공/프라모델 조립", "traits": { "R": 3 } },
        { "id": "B", "text": "체스/전략 게임", "traits": { "I": 3 } },
        { "id": "C", "text": "악기 연주/작곡", "traits": { "A": 3 } },
        { "id": "D", "text": "유기견 봉사/상담", "traits": { "S": 3 } },
        { "id": "E", "text": "유튜브 채널 운영", "traits": { "E": 3 } },
        { "id": "F", "text": "다이어리 꾸미기/수집", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "m12",
      "title": "미래 일기",
      "question": "미래의 나에게 편지를 쓴다면 어떤 내용일까요?",
      "options": [
        { "id": "A", "text": "무언가를 멋지게 고치는 나", "traits": { "R": 3 } },
        { "id": "B", "text": "새로운 지식을 발견한 나", "traits": { "I": 3 } },
        { "id": "C", "text": "자유롭게 꿈을 펼치는 나", "traits": { "A": 3 } },
        { "id": "D", "text": "사람들과 행복을 나누는 나", "traits": { "S": 3 } },
        { "id": "E", "text": "영향력 있는 리더가 된 나", "traits": { "E": 3 } },
        { "id": "F", "text": "안정적이고 성실한 나", "traits": { "C": 3 } }
      ]
    }
  ],
  high: [
    {
      "event_id": "h1",
      "title": "전공 선택의 기로",
      "question": "대학 전공을 고민한다면 어떤 계열이 끌리나요?",
      "options": [
        { "id": "A", "text": "공학/기술 계열", "traits": { "R": 3 } },
        { "id": "B", "text": "자연과학/인문학 연구", "traits": { "I": 3 } },
        { "id": "C", "text": "예술/디자인/방송", "traits": { "A": 3 } },
        { "id": "D", "text": "교육/간호/사회복지", "traits": { "S": 3 } },
        { "id": "E", "text": "경영/법학/정치", "traits": { "E": 3 } },
        { "id": "F", "text": "회계/행정/정보관리", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "h2",
      "title": "학생부 종합 전형",
      "question": "동아리 활동 리포트를 쓴다면 강조하고 싶은 점은?",
      "options": [
        { "id": "A", "text": "실제 결과물 제작 과정", "traits": { "R": 3 } },
        { "id": "B", "text": "심화 탐구 및 논문 분석", "traits": { "I": 3 } },
        { "id": "C", "text": "창의적인 문제 해결 사례", "traits": { "A": 3 } },
        { "id": "D", "text": "팀워크와 멘토링 경험", "traits": { "S": 3 } },
        { "id": "E", "text": "리더십과 프로젝트 총괄", "traits": { "E": 3 } },
        { "id": "F", "text": "체계적인 기록과 운영", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "h3",
      "title": "축제 기획",
      "question": "학교 축제에서 내가 맡고 싶은 역할은?",
      "options": [
        { "id": "A", "text": "무대 설치 및 장비 관리", "traits": { "R": 3 } },
        { "id": "B", "text": "축제 만족도 조사/분석", "traits": { "I": 2 } },
        { "id": "C", "text": "공연 기획 및 연출", "traits": { "A": 3 } },
        { "id": "D", "text": "안내 및 관객 지원", "traits": { "S": 2 } },
        { "id": "E", "text": "총괄 위원장", "traits": { "E": 3 } },
        { "id": "F", "text": "예산 집행 및 회계", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "h4",
      "title": "진로 상담",
      "question": "선생님과의 상담에서 가장 듣고 싶은 말은?",
      "options": [
        { "id": "A", "text": "\"실무 능력이 뛰어나구나\"", "traits": { "R": 2 } },
        { "id": "B", "text": "\"탐구 정신이 깊구나\"", "traits": { "I": 3 } },
        { "id": "C", "text": "\"남다른 독창성이 있네\"", "traits": { "A": 2 } },
        { "id": "D", "text": "\"사람을 끄는 따뜻함이 있어\"", "traits": { "S": 3 } },
        { "id": "E", "text": "\"조직을 이끄는 힘이 대단해\"", "traits": { "E": 3 } },
        { "id": "F", "text": "\"일 처리가 정말 정확해\"", "traits": { "C": 2 } }
      ]
    },
    {
      "event_id": "h5",
      "title": "미래의 나",
      "question": "10년 후 나의 모습으로 가장 기대되는 것은?",
      "options": [
        { "id": "A", "text": "숙련된 기술 전문가", "traits": { "R": 3 } },
        { "id": "B", "text": "지식을 탐구하는 학자", "traits": { "I": 3 } },
        { "id": "C", "text": "영감을 주는 아티스트", "traits": { "A": 3 } },
        { "id": "D", "text": "사회를 돕는 활동가", "traits": { "S": 3 } },
        { "id": "E", "text": "성공한 사업가/CEO", "traits": { "E": 3 } },
        { "id": "F", "text": "신뢰받는 전문 관리자", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "h6",
      "title": "논문 탐구",
      "question": "심화 탐구 보고서를 쓴다면 어떤 주제가 좋을까요?",
      "options": [
        { "id": "A", "text": "신기술 장비의 작동 원리", "traits": { "R": 3 } },
        { "id": "B", "text": "사회 현상의 통계적 분석", "traits": { "I": 3 } },
        { "id": "C", "text": "예술 작품의 시대적 재해석", "traits": { "A": 3 } },
        { "id": "D", "text": "청소년 심리 상담 사례", "traits": { "S": 3 } },
        { "id": "E", "text": "효율적인 조직 관리 전략", "traits": { "E": 3 } },
        { "id": "F", "text": "법률 및 규정의 체계 연구", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "h7",
      "title": "실습 교육",
      "question": "학교에서 실습 시간이 주어진다면?",
      "options": [
        { "id": "A", "text": "기계 분해 및 조립", "traits": { "R": 3 } },
        { "id": "B", "text": "화학 실험 및 관찰", "traits": { "I": 3 } },
        { "id": "C", "text": "영상 편집 및 제작", "traits": { "A": 3 } },
        { "id": "D", "text": "심폐소생술/응급처치", "traits": { "S": 3 } },
        { "id": "E", "text": "모의 주식/투자 실습", "traits": { "E": 3 } },
        { "id": "F", "text": "엑셀/데이터 정리 실습", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "h8",
      "title": "창업 경진대회",
      "question": "창업 아이디어 대회에 나간다면 나의 역할은?",
      "options": [
        { "id": "A", "text": "제품 프로토타입 제작", "traits": { "R": 3 } },
        { "id": "B", "text": "시장 조사 및 기술 분석", "traits": { "I": 3 } },
        { "id": "C", "text": "브랜딩 및 광고 디자인", "traits": { "A": 3 } },
        { "id": "D", "text": "고객 응대 및 서비스 기획", "traits": { "S": 3 } },
        { "id": "E", "text": "사업 계획 발표 및 영업", "traits": { "E": 3 } },
        { "id": "F", "text": "예산 수립 및 일정 관리", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "h9",
      "title": "멘토링 활동",
      "question": "후배들을 위한 멘토링을 한다면?",
      "options": [
        { "id": "A", "text": "실기/기술 노하우 전수", "traits": { "R": 3 } },
        { "id": "B", "text": "학습 방법 및 원리 설명", "traits": { "I": 3 } },
        { "id": "C", "text": "창의적 활동 지도", "traits": { "A": 2 } },
        { "id": "D", "text": "고민 상담 및 정서 지원", "traits": { "S": 3 } },
        { "id": "E", "text": "동기 부여 및 목표 설정", "traits": { "E": 3 } },
        { "id": "F", "text": "학습 플래너 관리 지도", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "h10",
      "title": "동아리 예산",
      "question": "동아리 지원금을 어떻게 사용하면 좋을까요?",
      "options": [
        { "id": "A", "text": "필요한 장비 구매", "traits": { "R": 3 } },
        { "id": "B", "text": "전문 서적/자료 구입", "traits": { "I": 3 } },
        { "id": "C", "text": "전시/공연 소품 제작", "traits": { "A": 3 } },
        { "id": "D", "text": "팀워크를 위한 간식", "traits": { "S": 2 } },
        { "id": "E", "text": "홍보 및 마케팅 비용", "traits": { "E": 3 } },
        { "id": "F", "text": "정확한 영수증 처리/저축", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "h11",
      "title": "졸업 작품",
      "question": "나의 고등학교 생활을 한마디로 정의한다면?",
      "options": [
        { "id": "A", "text": "끊임없이 도전한 시간", "traits": { "R": 2 } },
        { "id": "B", "text": "깊이 있게 탐구한 시간", "traits": { "I": 3 } },
        { "id": "C", "text": "나를 표현한 시간", "traits": { "A": 3 } },
        { "id": "D", "text": "함께 성장한 시간", "traits": { "S": 3 } },
        { "id": "E", "text": "앞서 나간 시간", "traits": { "E": 3 } },
        { "id": "F", "text": "성실하게 준비한 시간", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "h12",
      "title": "대학 탐방",
      "question": "가고 싶은 대학의 어떤 점이 가장 궁금한가요?",
      "options": [
        { "id": "A", "text": "실습실 및 기자재 수준", "traits": { "R": 3 } },
        { "id": "B", "text": "교수진의 연구 성과", "traits": { "I": 3 } },
        { "id": "C", "text": "예술적/문화적 학풍", "traits": { "A": 3 } },
        { "id": "D", "text": "학생 복지 및 커뮤니티", "traits": { "S": 3 } },
        { "id": "E", "text": "취업률 및 사회적 인지도", "traits": { "E": 3 } },
        { "id": "F", "text": "커리큘럼의 체계성", "traits": { "C": 3 } }
      ]
    }
  ],
  university: [
    {
      "event_id": "u1",
      "title": "대외활동 선택",
      "question": "방학 동안 참여하고 싶은 대외활동은?",
      "options": [
        { "id": "A", "text": "기술 실무 인턴십", "traits": { "R": 3 } },
        { "id": "B", "text": "학술 연구 프로젝트", "traits": { "I": 3 } },
        { "id": "C", "text": "콘텐츠 크리에이터", "traits": { "A": 3 } },
        { "id": "D", "text": "해외 교육 봉사", "traits": { "S": 3 } },
        { "id": "E", "text": "창업 동아리/해커톤", "traits": { "E": 3 } },
        { "id": "F", "text": "공공기관 서포터즈", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "u2",
      "title": "팀 프로젝트",
      "question": "전공 팀플에서 내가 선호하는 역할은?",
      "options": [
        { "id": "A", "text": "실제 구현/제작", "traits": { "R": 3 } },
        { "id": "B", "text": "자료 분석/논리 구축", "traits": { "I": 3 } },
        { "id": "C", "text": "디자인/아이디어 제안", "traits": { "A": 3 } },
        { "id": "D", "text": "팀 분위기 조율/소통", "traits": { "S": 3 } },
        { "id": "E", "text": "PM(프로젝트 매니저)", "traits": { "E": 3 } },
        { "id": "F", "text": "문서화/일정 관리", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "u3",
      "title": "취업 준비",
      "question": "자기소개서에서 가장 강조하고 싶은 역량은?",
      "options": [
        { "id": "A", "text": "현장 적응 및 실행력", "traits": { "R": 3 } },
        { "id": "B", "text": "분석적 사고 및 전문성", "traits": { "I": 3 } },
        { "id": "C", "text": "창의적 문제 해결력", "traits": { "A": 3 } },
        { "id": "D", "text": "협업 및 커뮤니케이션", "traits": { "S": 3 } },
        { "id": "E", "text": "목표 달성 및 리더십", "traits": { "E": 3 } },
        { "id": "F", "text": "성실함 및 체계적 관리", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "u4",
      "title": "여가 생활",
      "question": "주말에 주로 하고 싶은 활동은?",
      "options": [
        { "id": "A", "text": "DIY/가구 조립/운동", "traits": { "R": 2 } },
        { "id": "B", "text": "독서/다큐멘터리 시청", "traits": { "I": 2 } },
        { "id": "C", "text": "전시회/공연 관람", "traits": { "A": 2 } },
        { "id": "D", "text": "지인 모임/봉사", "traits": { "S": 2 } },
        { "id": "E", "text": "재테크 공부/네트워킹", "traits": { "E": 2 } },
        { "id": "F", "text": "정리정돈/일정 정리", "traits": { "C": 2 } }
      ]
    },
    {
      "event_id": "u5",
      "title": "커리어 목표",
      "question": "내가 꿈꾸는 직장의 모습은?",
      "options": [
        { "id": "A", "text": "기술력이 뛰어난 현장", "traits": { "R": 3 } },
        { "id": "B", "text": "연구에 몰입할 수 있는 곳", "traits": { "I": 3 } },
        { "id": "C", "text": "자유롭고 창의적인 환경", "traits": { "A": 3 } },
        { "id": "D", "text": "사람을 돕고 가치를 만드는 곳", "traits": { "S": 3 } },
        { "id": "E", "text": "성취와 보상이 확실한 곳", "traits": { "E": 3 } },
        { "id": "F", "text": "안정적이고 체계적인 조직", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "u6",
      "title": "인턴십 현장",
      "question": "인턴십에서 가장 배우고 싶은 실무는?",
      "options": [
        { "id": "A", "text": "현장 장비 운용 및 기술", "traits": { "R": 3 } },
        { "id": "B", "text": "데이터 분석 및 리서치", "traits": { "I": 3 } },
        { "id": "C", "text": "창의적 기획 및 디자인", "traits": { "A": 3 } },
        { "id": "D", "text": "고객 소통 및 서비스", "traits": { "S": 3 } },
        { "id": "E", "text": "비즈니스 전략 및 영업", "traits": { "E": 3 } },
        { "id": "F", "text": "행정 지원 및 문서 관리", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "u7",
      "title": "학술 세미나",
      "question": "관심 있는 세미나 주제를 고른다면?",
      "options": [
        { "id": "A", "text": "최신 하드웨어 기술 동향", "traits": { "R": 3 } },
        { "id": "B", "text": "인공지능의 윤리적 탐구", "traits": { "I": 3 } },
        { "id": "C", "text": "포스트모더니즘 예술론", "traits": { "A": 3 } },
        { "id": "D", "text": "현대 사회의 복지 사각지대", "traits": { "S": 3 } },
        { "id": "E", "text": "글로벌 시장 경제 전망", "traits": { "E": 3 } },
        { "id": "F", "text": "효율적인 품질 관리 시스템", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "u8",
      "title": "공모전 도전",
      "question": "공모전에 참여한다면 어떤 분야가 좋을까요?",
      "options": [
        { "id": "A", "text": "발명/특허 아이디어", "traits": { "R": 3 } },
        { "id": "B", "text": "빅데이터 분석 시각화", "traits": { "I": 3 } },
        { "id": "C", "text": "광고/영상 크리에이티브", "traits": { "A": 3 } },
        { "id": "D", "text": "사회 문제 해결 캠페인", "traits": { "S": 3 } },
        { "id": "E", "text": "스타트업 비즈니스 모델", "traits": { "E": 3 } },
        { "id": "F", "text": "공공 정책 제안", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "u9",
      "title": "교육 봉사",
      "question": "교육 봉사에서 내가 맡고 싶은 과목은?",
      "options": [
        { "id": "A", "text": "체육/공작 실습", "traits": { "R": 3 } },
        { "id": "B", "text": "수학/과학 원리", "traits": { "I": 3 } },
        { "id": "C", "text": "음악/미술/연극", "traits": { "A": 3 } },
        { "id": "D", "text": "국어/영어/상담", "traits": { "S": 3 } },
        { "id": "E", "text": "스피치/리더십", "traits": { "E": 3 } },
        { "id": "F", "text": "컴퓨터 활용/코딩 기초", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "u10",
      "title": "자격증 취득",
      "question": "가장 먼저 취득하고 싶은 자격증은?",
      "options": [
        { "id": "A", "text": "기술/기능사 자격증", "traits": { "R": 3 } },
        { "id": "B", "text": "데이터 분석 전문가", "traits": { "I": 3 } },
        { "id": "C", "text": "디자인/영상 편집 기사", "traits": { "A": 3 } },
        { "id": "D", "text": "사회복지사/상담사", "traits": { "S": 3 } },
        { "id": "E", "text": "경영지도사/공인중개사", "traits": { "E": 3 } },
        { "id": "F", "text": "회계사/세무사/행정사", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "u11",
      "title": "졸업 전시/논문",
      "question": "졸업을 앞두고 가장 공들여 준비하는 것은?",
      "options": [
        { "id": "A", "text": "완성도 높은 시제품", "traits": { "R": 3 } },
        { "id": "B", "text": "깊이 있는 연구 논문", "traits": { "I": 3 } },
        { "id": "C", "text": "독창적인 예술 전시", "traits": { "A": 3 } },
        { "id": "D", "text": "지역 사회 기여 프로젝트", "traits": { "S": 3 } },
        { "id": "E", "text": "창업 아이템 피칭", "traits": { "E": 3 } },
        { "id": "F", "text": "체계적인 포트폴리오 정리", "traits": { "C": 3 } }
      ]
    },
    {
      "event_id": "u12",
      "title": "첫 출근 준비",
      "question": "첫 출근 전날, 나의 마음가짐은?",
      "options": [
        { "id": "A", "text": "현장에서 빨리 배우자", "traits": { "R": 3 } },
        { "id": "B", "text": "업무 프로세스를 파악하자", "traits": { "I": 3 } },
        { "id": "C", "text": "나만의 색깔을 보여주자", "traits": { "A": 3 } },
        { "id": "D", "text": "동료들과 잘 지내보자", "traits": { "S": 3 } },
        { "id": "E", "text": "빠르게 성과를 내보자", "traits": { "E": 3 } },
        { "id": "F", "text": "규칙과 문화를 익히자", "traits": { "C": 3 } }
      ]
    }
  ]
};
