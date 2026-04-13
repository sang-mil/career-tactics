import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPreferences } from '../types';
import { 
  Tv, Book, Film, Gamepad2, Sparkles, ChevronRight, Search, CheckCircle2,
  Clapperboard, Library
} from 'lucide-react';

interface PreferenceSelectionScreenProps {
  onComplete: (preferences: UserPreferences) => void;
}

const MEDIA_TYPES = [
  { id: 'anime', label: '애니메이션', icon: Tv, color: 'bg-orange-100 text-orange-600', border: 'border-orange-200' },
  { id: 'novel', label: '소설/웹소설', icon: Library, color: 'bg-blue-100 text-blue-600', border: 'border-blue-200' },
  { id: 'drama', label: '드라마', icon: Clapperboard, color: 'bg-purple-100 text-purple-600', border: 'border-purple-200' },
  { id: 'manga', label: '만화/웹툰', icon: Book, color: 'bg-green-100 text-green-600', border: 'border-green-200' },
  { id: 'game', label: '게임', icon: Gamepad2, color: 'bg-indigo-100 text-indigo-600', border: 'border-indigo-200' },
  { id: 'movie', label: '영화', icon: Film, color: 'bg-red-100 text-red-600', border: 'border-red-200' },
] as const;

const SUGGESTIONS: Record<string, string[]> = {
  anime: ['귀멸의 칼날', '주술회전', '나루토', '원피스', '지브리 시리즈', '신세기 에반게리온'],
  novel: ['해리포터', '반지의 제왕', '전지적 독자 시점', '나 혼자만 레벨업', '셜록 홈즈'],
  drama: ['오징어 게임', '더 글로리', '이상한 변호사 우영우', '브레이킹 배드', '왕좌의 게임'],
  manga: ['슬램덩크', '베르세르크', '강철의 연금술사', '진격의 거인', '유미의 세포들'],
  game: ['리그 오브 레전드', '엘든 링', '젤다의 전설', '파이널 판타지', '원신', '스타듀 밸리'],
  movie: ['인셉션', '인터스텔라', '마블 시네마틱 유니버스', '다크 나이트', '기생충'],
};

export default function PreferenceSelectionScreen({ onComplete }: PreferenceSelectionScreenProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedType, setSelectedType] = useState<UserPreferences['mediaType'] | null>(null);
  const [titles, setTitles] = useState<string[]>([]);
  const [customTitle, setCustomTitle] = useState('');

  const handleTypeSelect = (type: UserPreferences['mediaType']) => {
    setSelectedType(type);
    setStep(2);
  };

  const toggleTitle = (title: string) => {
    setTitles(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const addCustomTitle = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTitle.trim() && !titles.includes(customTitle.trim())) {
      setTitles(prev => [...prev, customTitle.trim()]);
      setCustomTitle('');
    }
  };

  const handleFinish = () => {
    if (selectedType) {
      onComplete({
        mediaType: selectedType,
        favoriteTitles: titles,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 min-h-[80vh] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12 text-center"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="inline-block p-3 bg-indigo-100 rounded-2xl text-indigo-600 mb-2"
              >
                <Sparkles className="w-8 h-8" />
              </motion.div>
              <h1 className="text-4xl font-bold text-gray-900">당신의 취향을 알려주세요</h1>
              <p className="text-gray-500 text-lg">
                가장 좋아하는 미디어 장르를 선택해주세요. <br />
                당신에게 친숙한 세계관으로 모험을 구성해 드릴게요.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {MEDIA_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id)}
                  className={`p-6 rounded-3xl border-2 transition-all group hover:shadow-xl ${type.border} hover:bg-white bg-gray-50/50 flex flex-col items-center gap-4`}
                >
                  <div className={`p-4 rounded-2xl ${type.color} group-hover:scale-110 transition-transform`}>
                    <type.icon className="w-8 h-8" />
                  </div>
                  <span className="font-bold text-gray-700">{type.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
          >
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={() => setStep(1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6 rotate-180 text-gray-400" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">어떤 작품을 좋아하시나요?</h2>
                <p className="text-gray-500">좋아하는 작품을 선택하거나 직접 입력해주세요. (최대 3개 권장)</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                {selectedType && SUGGESTIONS[selectedType].map((title) => (
                  <button
                    key={title}
                    onClick={() => toggleTitle(title)}
                    className={`px-6 py-3 rounded-2xl font-medium transition-all flex items-center gap-2 border-2 ${
                      titles.includes(title)
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg'
                        : 'bg-white text-gray-600 border-gray-100 hover:border-indigo-200'
                    }`}
                  >
                    {title}
                    {titles.includes(title) && <CheckCircle2 className="w-4 h-4" />}
                  </button>
                ))}
              </div>

              <form onSubmit={addCustomTitle} className="relative max-w-md">
                <input
                  type="text"
                  placeholder="직접 입력하기..."
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-indigo-500 outline-none transition-all shadow-sm"
                />
                <Search className="absolute left-4 top-4.5 w-5 h-5 text-gray-400" />
              </form>

              {titles.length > 0 && (
                <div className="pt-8 flex justify-center">
                  <button
                    onClick={handleFinish}
                    className="group flex items-center gap-3 px-10 py-5 bg-indigo-600 text-white rounded-3xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl hover:shadow-indigo-200 active:scale-95"
                  >
                    이 취향으로 세계 생성하기
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
