import React from 'react';
import { motion } from 'motion/react';
import { Shield, Sword, Book, Users, Briefcase, Zap, GraduationCap, Clock, Loader2 } from 'lucide-react';
import { EducationLevel } from '../types';

interface OnboardingProps {
  onStart: (level: EducationLevel, method: 'google' | 'anonymous') => void;
  onViewHistory: () => void;
  isLoggedIn: boolean;
  loadingHistory: boolean;
}

export default function Onboarding({ onStart, onViewHistory, isLoggedIn, loadingHistory }: OnboardingProps) {
  const [selectedLevel, setSelectedLevel] = React.useState<EducationLevel>('university');

  const levels: { id: EducationLevel; label: string; desc: string }[] = [
    { id: 'elementary', label: '초등학교', desc: '기초 성향 탐색' },
    { id: 'middle', label: '중학교', desc: '자유학기제 및 진로 탐색' },
    { id: 'high', label: '고등학교', desc: '전공 및 진학 고민' },
    { id: 'university', label: '대학교/일반', desc: '본격적인 커리어 설계' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full"
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Shield className="w-20 h-20 text-indigo-600" />
            <Sword className="absolute -bottom-2 -right-2 w-10 h-10 text-amber-500" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
          sRPG 커리어 진단 서비스
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          당신의 선택이 미래를 결정합니다. 전략적인 결정을 통해 당신의 숨겨진 재능을 발견하고 최적의 커리어 패스를 찾아보세요.
        </p>

        <div className="mb-10">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
            <GraduationCap className="w-4 h-4" />
            진단 레벨 선택
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={`p-4 rounded-2xl border-2 transition-all text-left group ${
                  selectedLevel === level.id
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-md'
                    : 'border-gray-100 bg-white hover:border-indigo-200'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                  selectedLevel === level.id ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                }`}>
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="font-bold text-gray-900">{level.label}</div>
                <div className="text-xs text-gray-500 mt-1">{level.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {[
            { icon: Shield, label: "현실형 (R)", color: "text-red-500" },
            { icon: Book, label: "탐구형 (I)", color: "text-blue-500" },
            { icon: Zap, label: "예술형 (A)", color: "text-purple-500" },
            { icon: Users, label: "사회형 (S)", color: "text-green-500" },
            { icon: Briefcase, label: "진취형 (E)", color: "text-orange-500" },
            { icon: Shield, label: "관습형 (C)", color: "text-gray-500" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm border border-gray-100">
              <item.icon className={`w-6 h-6 ${item.color} mb-2`} />
              <span className="text-xs font-medium text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onStart(selectedLevel, 'anonymous')}
            className="group relative px-12 py-5 bg-indigo-600 text-white rounded-full font-bold text-xl shadow-xl hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            게스트로 시작하기
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
          </button>

          <button
            onClick={() => onStart(selectedLevel, 'google')}
            className="px-12 py-5 bg-white text-gray-700 border-2 border-gray-100 rounded-full font-bold text-xl shadow-md hover:border-indigo-200 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 w-full sm:w-auto"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
            구글로 시작하기
          </button>
        </div>

        {isLoggedIn && (
          <div className="mt-8">
            <button
              onClick={onViewHistory}
              disabled={loadingHistory}
              className="flex items-center gap-2 text-gray-400 hover:text-indigo-600 transition-colors mx-auto font-medium"
            >
              {loadingHistory ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Clock className="w-5 h-5" />
              )}
              이전 진단 기록 보기
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
