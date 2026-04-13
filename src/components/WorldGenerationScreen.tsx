import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { GeneratedWorld, RIASEC, UserPreferences } from '../types';
import { generateWorld } from '../lib/ai';
import { Loader2, Globe, Cpu, Sparkles, ChevronRight } from 'lucide-react';

interface WorldGenerationScreenProps {
  riasecScores: RIASEC;
  preferences: UserPreferences;
  onWorldReady: (world: GeneratedWorld) => void;
}

export default function WorldGenerationScreen({ riasecScores, preferences, onWorldReady }: WorldGenerationScreenProps) {
  const [world, setWorld] = useState<GeneratedWorld | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);

  const steps = [
    "RIASEC 성향 벡터 분석 중...",
    "사용자 미디어 취향 반영 중...",
    "세계관 테마 선정 중...",
    "맞춤형 시나리오 생성 중...",
    "상호작용 이벤트 설계 중...",
    "차원 연결 완료!"
  ];

  useEffect(() => {
    const fetchWorld = async () => {
      try {
        const generated = await generateWorld(riasecScores, preferences);
        setWorld(generated);
        setLoading(false);
      } catch (error) {
        console.error("World generation failed:", error);
      }
    };

    fetchWorld();

    const interval = setInterval(() => {
      setStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2000);

    return () => clearInterval(interval);
  }, [riasecScores]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 border-4 border-indigo-100 border-t-indigo-600 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Globe className="w-12 h-12 text-indigo-600 animate-pulse" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 font-display">당신만을 위한 세계를 창조하고 있습니다</h2>
          <div className="flex flex-col items-center gap-2">
            <p className="text-indigo-600 font-medium">{steps[step]}</p>
            <div className="flex gap-1">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 rounded-full transition-colors ${i <= step ? 'bg-indigo-600' : 'bg-gray-200'}`} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!world) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto py-12 px-4"
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-indigo-600 p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Globe className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-indigo-200" />
              <span className="text-indigo-100 font-medium tracking-wider uppercase text-sm">AI Generated World</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">{world.name}</h1>
            <p className="text-xl text-indigo-100 max-w-2xl leading-relaxed">
              {world.description}
            </p>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-indigo-600" />
                세계 핵심 메커니즘
              </h3>
              <div className="space-y-4">
                {world.core_mechanics.map((mechanic, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100"
                  >
                    <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-indigo-600 font-bold">
                      {i + 1}
                    </div>
                    <span className="font-medium text-gray-700">{mechanic}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
              <h3 className="text-2xl font-bold text-indigo-900 mb-4">새로운 퀘스트가 준비되었습니다</h3>
              <p className="text-indigo-700 mb-8 leading-relaxed">
                이 세계에서 당신의 능력을 증명할 3가지 특별한 이벤트가 기다리고 있습니다. 
                당신의 선택은 최종 커리어 진단에 결정적인 영향을 미칩니다.
              </p>
              <button
                onClick={() => onWorldReady(world)}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
              >
                세계로 입장하기
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
