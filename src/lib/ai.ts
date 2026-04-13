import { GoogleGenAI, Type } from "@google/genai";
import { RIASEC, Choice, UserPreferences, EducationLevel } from "../types";

const ai = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '' 
});

export async function generateCareerReport(userRiasec: RIASEC, topCareers: any[], choices: Choice[], level?: EducationLevel) {
  const topTraits = Object.entries(userRiasec)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([trait]) => trait);

  const prompt = `
    다음 데이터를 바탕으로 고도로 개인화된 커리어 리포트를 작성해주세요.
    
    사용자 교육 수준: ${level || '알 수 없음'}
    사용자 RIASEC 점수: ${JSON.stringify(userRiasec)}
    주요 특성: ${topTraits.join(", ")}
    추천 직업 목록: ${JSON.stringify(topCareers)}
    사용자 선택 데이터 (행동 분석용): ${JSON.stringify(choices)}

    반드시 한국어로 작성하며, 다음 구조를 엄격히 따르세요.
    1. Title: 한 문장으로 요약된 정체성
    2. Core Personality Summary: 3~5줄의 핵심 성격 요약 (교육 수준에 맞는 어조와 내용을 사용하세요)
    3. Behavior Insight: 실제 선택 데이터를 기반으로 한 행동 분석
    4. Strengths: 실무 기술과 연결된 강점
    5. Weaknesses: 건설적인 약점 및 보완점
    6. Recommended Careers: 상위 3개 직업과 그 이유
    7. Growth Advice: 실질적인 행동 지침 (교육 수준에 맞는 실천 방안을 제시하세요)
    8. Closing Insight: 한 줄의 마무리 통찰
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: `당신은 커리어 분석 전문가이자 서사형 리포트 생성기입니다.
사용자의 행동 데이터와 RIASEC 점수를 고도로 개인화된 커리어 리포트로 변환하는 것이 당신의 임무입니다.

목표:
1. 사용자가 "정확하게 이해받았다"고 느끼게 할 것
2. 결과가 나온 이유를 점수뿐만 아니라 '행동'에 근거하여 설명할 것
3. 현실적이고 실행 가능한 커리어 경로를 제공할 것
4. 단순한 테스트 결과가 아닌, 한 편의 이야기처럼 몰입감 있게 작성할 것

엄격한 규칙:
- 단순히 특성을 나열하지 마세요.
- 항상 특성 → 행동 → 커리어를 연결하세요.
- 일반적인 문구(예: "당신은 창의적입니다")를 피하고 구체적으로 작성하세요.
- 최종 리포트에서 과장되거나 판타지스러운 톤은 지양하세요 (몰입감은 유지하되 현실적으로).
- 어조: 통찰력 있고, 약간의 서사적 느낌이 있으며, 차분하고 자신감 있는 어조. 너무 감정적이지 않게.
- 모든 출력은 한국어여야 합니다.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          coreSummary: { type: Type.STRING },
          behaviorInsight: { type: Type.STRING },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
          careerExplanations: { 
            type: Type.ARRAY, 
            items: { 
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                reason: { type: Type.STRING },
                originalTitle: { type: Type.STRING }
              },
              required: ["title", "reason", "originalTitle"]
            } 
          },
          growthAdvice: { type: Type.ARRAY, items: { type: Type.STRING } },
          closingInsight: { type: Type.STRING }
        },
        required: ["title", "coreSummary", "behaviorInsight", "strengths", "weaknesses", "careerExplanations", "growthAdvice", "closingInsight"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
}

export async function generateCareerRoadmap(careerTitle: string, userRiasec: RIASEC) {
  const prompt = `
    다음 직업에 대한 커리어 로드맵을 작성해주세요.
    이 리포트는 해당 분야에서 10년 이상 경력을 쌓은 선배(페르소나)가 자신의 경험을 들려주는 형식으로 작성해야 합니다.
    사용자의 RIASEC 성향(${JSON.stringify(userRiasec)})을 고려하여, 선배가 사용자의 강점을 어떻게 활용했는지 언급하며 조언해주세요.

    대상 직업: ${careerTitle}

    반드시 한국어로 작성하며, 다음 구조를 따르세요:
    1. persona: 선배 정보 (이름, 경력 연수, 현재 직함, 따뜻하고 진솔한 도입부 메시지)
    2. title: 로드맵 제목
    3. steps: 3단계 로드맵 리스트 (선배가 실제로 겪었던 과정처럼 묘사)
       - title: 단계 제목
       - period: 예상 소요 기간
       - description: 선배의 경험담이 담긴 단계 설명
       - actions: 구체적인 실천 사항 리스트 (3개)
    4. finalGoal: 최종 지향점 및 선배의 마지막 응원 한마디
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: "당신은 10년 이상의 경력을 가진 베테랑 멘토입니다. 후배에게 자신의 커리어 여정을 들려주듯 친근하고 전문적인 톤으로 로드맵을 설계합니다.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          persona: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              years: { type: Type.NUMBER },
              role: { type: Type.STRING },
              intro: { type: Type.STRING }
            },
            required: ["name", "years", "role", "intro"]
          },
          title: { type: Type.STRING },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                period: { type: Type.STRING },
                description: { type: Type.STRING },
                actions: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["title", "period", "description", "actions"]
            }
          },
          finalGoal: { type: Type.STRING }
        },
        required: ["persona", "title", "steps", "finalGoal"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
}

export async function translateCareerDetail(career: any) {
  const prompt = `
    다음 직업 정보를 바탕으로 한국어로 된 상세 직업 프로필을 작성해주세요.
    단순 번역이 아니라, 한국의 직업 시장 맥락을 고려하여 전문적이고 이해하기 쉽게 작성해야 합니다.

    직업명: ${career.title}
    설명: ${career.description}
    필요 기술: ${JSON.stringify(career.skills)}
    RIASEC 특성: ${JSON.stringify(career.riasec)}

    반드시 한국어로 작성하며, 다음 구조를 따르세요:
    1. title: 직업명 (한국어)
    2. description: 직업에 대한 상세 설명 (3~5문장)
    3. keyTasks: 주요 업무 리스트 (3~5개)
    4. requiredSkills: 필요한 핵심 역량 및 기술 (3~5개)
    5. marketOutlook: 한국 내 직업 전망 및 가치 (2~3문장)
    6. advice: 이 직업을 준비하기 위한 조언 (2~3문장)
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: "당신은 글로벌 직업 데이터 분석가이자 커리어 컨설턴트입니다. 영문 직업 데이터를 한국 사용자가 이해하기 쉬운 전문적인 한국어 리포트로 변환합니다.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          keyTasks: { type: Type.ARRAY, items: { type: Type.STRING } },
          requiredSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
          marketOutlook: { type: Type.STRING },
          advice: { type: Type.STRING }
        },
        required: ["title", "description", "keyTasks", "requiredSkills", "marketOutlook", "advice"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
}

export async function generateWorld(userRiasec: RIASEC, preferences: UserPreferences) {
  const topTraits = Object.entries(userRiasec)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([trait]) => trait);

  const prompt = JSON.stringify({
    riasec: userRiasec,
    top_traits: topTraits,
    preferences: {
      media_type: preferences.mediaType,
      favorite_titles: preferences.favoriteTitles
    },
    style: ["analytical", "creative"] // Default style
  });

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: `You are a world-building engine for a career exploration RPG.
Your task: Generate a personalized game world and events based on user's personality traits (RIASEC) and their media preferences.

Requirements:
1. Create a unique world setting (Korean name and description)
2. The world theme MUST be inspired by the user's favorite media type (${preferences.mediaType}) and specific titles (${preferences.favoriteTitles.join(", ")}).
3. Use terminology, atmosphere, and concepts familiar to fans of those works, but create an original story.
4. Reflect dominant traits in world mechanics
5. Generate 5 interactive events
6. Each event must include 4 choices
7. Each choice must map to RIASEC traits (R, I, A, S, E, C)

Constraints:
- Do NOT make obvious "personality test" questions
- Make everything feel like gameplay
- Choices must all feel valid (no right answer)
- Maintain immersion
- ALL text (name, description, question, options) MUST be in Korean.
- Ensure the tone matches the selected media type (e.g., epic for fantasy novels, stylish for modern anime).

Output format (STRICT JSON):
{
  "name": "World Name",
  "description": "World Description",
  "core_mechanics": ["Mechanic 1", "Mechanic 2"],
  "events": [
    {
      "event_id": "gen_1",
      "title": "Event Title",
      "question": "Situation description",
      "options": [
        { "id": "opt_1", "text": "Action 1", "traits": { "R": 2 } },
        ...
      ]
    }
  ]
}`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          core_mechanics: { type: Type.ARRAY, items: { type: Type.STRING } },
          events: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                event_id: { type: Type.STRING },
                title: { type: Type.STRING },
                question: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      text: { type: Type.STRING },
                      traits: {
                        type: Type.OBJECT,
                        properties: {
                          R: { type: Type.NUMBER },
                          I: { type: Type.NUMBER },
                          A: { type: Type.NUMBER },
                          S: { type: Type.NUMBER },
                          E: { type: Type.NUMBER },
                          C: { type: Type.NUMBER }
                        }
                      }
                    },
                    required: ["id", "text", "traits"]
                  }
                }
              },
              required: ["event_id", "title", "question", "options"]
            }
          }
        },
        required: ["name", "description", "core_mechanics", "events"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
}
