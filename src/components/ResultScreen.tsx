import React from 'react';
import { motion } from 'motion/react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer 
} from 'recharts';
import { RIASEC, UserSession, Career } from '../types';
import { Briefcase, Award, TrendingUp, RefreshCw, ChevronRight, Sparkles, Zap, Shield, X, Loader2, ExternalLink, CheckCircle2, Globe, Map, Download } from 'lucide-react';
import { translateCareerDetail, generateCareerRoadmap } from '../lib/ai';
import { CAREER_DATASET } from '../data/careers';
import { AnimatePresence } from 'framer-motion';

interface ResultScreenProps {
  session: UserSession;
  onRestart: () => void;
}

interface CareerDetail {
  title: string;
  description: string;
  keyTasks: string[];
  requiredSkills: string[];
  marketOutlook: string;
  advice: string;
}

interface RoadmapStep {
  title: string;
  period: string;
  description: string;
  actions: string[];
}

interface CareerRoadmap {
  persona: {
    name: string;
    years: number;
    role: string;
    intro: string;
  };
  title: string;
  steps: RoadmapStep[];
  finalGoal: string;
}

export default function ResultScreen({ session, onRestart }: ResultScreenProps) {
  const [selectedCareer, setSelectedCareer] = React.useState<Career | null>(null);
  const [careerDetail, setCareerDetail] = React.useState<CareerDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = React.useState(false);
  const [cachedDetails, setCachedDetails] = React.useState<Record<string, CareerDetail>>(session.prefetchedDetails || {});
  const [searchQuery, setSearchQuery] = React.useState('');
  const [displayCount, setDisplayCount] = React.useState(12);

  const [roadmap, setRoadmap] = React.useState<CareerRoadmap | null>(null);
  const [loadingRoadmap, setLoadingRoadmap] = React.useState(false);

  const handleGenerateRoadmap = async () => {
    if (!careerDetail || !session.riasecScores) return;
    
    setLoadingRoadmap(true);
    try {
      const data = await generateCareerRoadmap(careerDetail.title, session.riasecScores);
      setRoadmap(data);
    } catch (error) {
      console.error("Error generating roadmap:", error);
    } finally {
      setLoadingRoadmap(false);
    }
  };

  const downloadRoadmap = () => {
    if (!roadmap) return;

    const content = `
# ${roadmap.title}
## 멘토: ${roadmap.persona.name} (${roadmap.persona.years}년차 ${roadmap.persona.role})

"${roadmap.persona.intro}"

## 최종 목표: ${roadmap.finalGoal}

${roadmap.steps.map((step, i) => `
### Step ${i + 1}: ${step.title} (${step.period})
- 선배의 조언: ${step.description}
- 실천 사항:
${step.actions.map(a => `  * ${a}`).join('\n')}
`).join('\n')}

---
생성일: ${new Date().toLocaleDateString()}
sRPG Career Analysis System - Mentor Series
    `;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${roadmap.title.replace(/\s+/g, '_')}_로드맵.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const allMatches = React.useMemo(() => {
    if (!session.riasecScores) return [];
    
    // Calculate matches for all careers
    const userVec = [
      session.riasecScores.R, 
      session.riasecScores.I, 
      session.riasecScores.A, 
      session.riasecScores.S, 
      session.riasecScores.E, 
      session.riasecScores.C
    ];

    const topTraits = Object.entries(session.riasecScores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([trait]) => trait);

    return CAREER_DATASET.map(career => {
      const careerVec = [
        career.riasec.R, career.riasec.I, career.riasec.A,
        career.riasec.S, career.riasec.E, career.riasec.C
      ];

      // Cosine Similarity
      let dotProduct = 0, mA = 0, mB = 0;
      for (let i = 0; i < 6; i++) {
        dotProduct += userVec[i] * careerVec[i];
        mA += userVec[i] * userVec[i];
        mB += careerVec[i] * careerVec[i];
      }
      const similarity = (mA === 0 || mB === 0) ? 0 : dotProduct / (Math.sqrt(mA) * Math.sqrt(mB));
      const tagMatch = career.tags.filter(tag => topTraits.includes(tag)).length / 3;
      const score = Math.round(((0.8 * similarity) + (0.2 * tagMatch)) * 100);

      return { ...career, matchScore: score };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }, [session.riasecScores]);

  const filteredCareers = React.useMemo(() => {
    const topCodes = session.topCareers?.map(c => c.code) || [];
    return allMatches
      .filter(c => !topCodes.includes(c.code))
      .filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
  }, [allMatches, searchQuery, session.topCareers]);

  // Pre-fetch career details when the component mounts
  React.useEffect(() => {
    const prefetchDetails = async () => {
      if (!session.aiReport?.careerExplanations) return;

      // We only pre-fetch the top 3 recommended careers from the AI report
      const prefetchPromises = session.aiReport.careerExplanations.map(async (careerExp) => {
        const career = CAREER_DATASET.find(c => c.title === careerExp.originalTitle);
        if (career && !cachedDetails[career.code]) {
          try {
            const detail = await translateCareerDetail(career);
            return { code: career.code, detail };
          } catch (error) {
            console.error(`Error pre-fetching detail for ${career.title}:`, error);
          }
        }
        return null;
      });

      const results = await Promise.all(prefetchPromises);
      const newDetails: Record<string, CareerDetail> = {};
      results.forEach(res => {
        if (res) newDetails[res.code] = res.detail;
      });

      if (Object.keys(newDetails).length > 0) {
        setCachedDetails(prev => ({ ...prev, ...newDetails }));
      }
    };

    prefetchDetails();
  }, [session.aiReport]);

  const handleCareerClick = async (careerCode: string) => {
    const career = CAREER_DATASET.find(c => c.code === careerCode);
    if (!career) return;

    setSelectedCareer(career);
    setRoadmap(null); // Reset roadmap when changing career

    // Use cached detail if available
    if (cachedDetails[careerCode]) {
      setCareerDetail(cachedDetails[careerCode]);
      return;
    }

    setLoadingDetail(true);
    try {
      const detail = await translateCareerDetail(career);
      setCareerDetail(detail);
      setCachedDetails(prev => ({ ...prev, [careerCode]: detail }));
    } catch (error) {
      console.error("Error fetching career detail:", error);
    } finally {
      setLoadingDetail(false);
    }
  };

  const radarData = [
    { subject: '현실형 (R)', value: session.riasecScores?.R || 0, fullMark: 100 },
    { subject: '탐구형 (I)', value: session.riasecScores?.I || 0, fullMark: 100 },
    { subject: '예술형 (A)', value: session.riasecScores?.A || 0, fullMark: 100 },
    { subject: '사회형 (S)', value: session.riasecScores?.S || 0, fullMark: 100 },
    { subject: '진취형 (E)', value: session.riasecScores?.E || 0, fullMark: 100 },
    { subject: '관습형 (C)', value: session.riasecScores?.C || 0, fullMark: 100 },
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-12">
      <header className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-block p-3 bg-indigo-100 rounded-2xl text-indigo-600 mb-2"
        >
          <Award className="w-8 h-8" />
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-900">진단 완료</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          당신의 전략적 선택을 분석했습니다. 당신의 전문적인 성향 프로필과 추천 커리어 패스를 확인해보세요.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {/* RIASEC Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            RIASEC 성향 프로필
          </h2>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="User"
                  dataKey="value"
                  stroke="#4f46e5"
                  fill="#4f46e5"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Careers */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600" />
            추천 커리어
          </h2>
          {session.topCareers?.map((career, idx) => {
            // Find translated title from aiReport if available
            const translatedInfo = session.aiReport?.careerExplanations.find(
              exp => exp.originalTitle === career.title
            );
            const displayTitle = translatedInfo?.title || career.title;

            return (
              <button 
                key={career.code}
                onClick={() => handleCareerClick(career.code)}
                className="w-full bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md hover:border-indigo-200 transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{displayTitle}</h3>
                    <p className="text-xs text-gray-500">매칭 점수: {career.score}%</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-600 transition-colors" />
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* AI Report */}
      {session.aiReport && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden"
        >
          <div className="bg-indigo-900 p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl" />
            <div className="relative z-10 space-y-4">
              <div className="inline-block px-4 py-1 bg-indigo-500/30 rounded-full text-indigo-200 text-xs font-bold tracking-widest uppercase">
                Expert Analysis
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white font-display leading-tight break-keep">
                {session.aiReport.title}
              </h2>
              <p className="text-indigo-100 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-medium break-keep whitespace-pre-line">
                {session.aiReport.coreSummary}
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            <div className="bg-indigo-50/50 p-8 rounded-3xl border border-indigo-100">
              <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                행동 데이터 기반 통찰
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg break-keep whitespace-pre-line">
                {session.aiReport.behaviorInsight}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 px-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  핵심 강점
                </h3>
                <div className="grid gap-3">
                  {session.aiReport.strengths.map((s, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <span className="text-gray-700 font-medium">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 px-2">
                  <Shield className="w-5 h-5 text-red-500" />
                  주의가 필요한 지점
                </h3>
                <div className="grid gap-3">
                  {session.aiReport.weaknesses.map((w, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-red-50/30 rounded-2xl border border-red-100">
                      <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        !
                      </div>
                      <span className="text-gray-700 font-medium">{w}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 px-2">
                <Briefcase className="w-5 h-5 text-indigo-600" />
                커리어 상세 가이드
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {session.aiReport.careerExplanations.map((career, i) => (
                  <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-3">
                    <h4 className="font-bold text-indigo-900 text-lg">{career.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{career.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-gray-100 space-y-12">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-600" />
                    성장을 위한 조언
                  </h3>
                  <div className="grid gap-3">
                    {session.aiReport.growthAdvice.map((a, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-indigo-50/30 rounded-2xl border border-indigo-100/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                        <span className="text-gray-700 text-sm leading-relaxed font-medium">{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    마지막 한 마디
                  </h3>
                  <div className="bg-indigo-900 p-10 rounded-[2.5rem] text-center relative overflow-hidden shadow-xl shadow-indigo-100">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/20 to-transparent" />
                    <div className="relative z-10">
                      <span className="text-indigo-300 text-4xl font-serif opacity-50 block mb-2">"</span>
                      <p className="text-xl md:text-2xl font-serif italic text-white leading-relaxed px-4 break-keep whitespace-pre-line">
                        {session.aiReport.closingInsight}
                      </p>
                      <span className="text-indigo-300 text-4xl font-serif opacity-50 block mt-4 text-right">"</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Explore More Careers */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Globe className="w-6 h-6 text-indigo-600" />
              더 많은 진로 탐색하기
            </h2>
            <p className="text-gray-500">당신의 성향과 어울리는 다른 직업들도 확인해보세요.</p>
          </div>
          
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="직업명 또는 태그 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
            />
            <Briefcase className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCareers.slice(0, displayCount).map((career) => (
            <motion.button
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              key={career.code}
              onClick={() => handleCareerClick(career.code)}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all text-left group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                  {career.matchScore}% 일치
                </div>
              </div>
              
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 flex-grow">
                {career.title}
              </h3>
              
              <div className="flex flex-wrap gap-1 mt-auto">
                {career.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>

        {filteredCareers.length > displayCount && (
          <div className="flex justify-center">
            <button
              onClick={() => setDisplayCount(prev => prev + 12)}
              className="px-6 py-2 text-indigo-600 font-bold hover:bg-indigo-50 rounded-full transition-colors flex items-center gap-2"
            >
              더 보기
              <ChevronRight className="w-4 h-4 rotate-90" />
            </button>
          </div>
        )}

        {filteredCareers.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400">검색 결과가 없습니다.</p>
          </div>
        )}
      </section>

      <div className="flex justify-center pt-8">
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-8 py-4 bg-white text-gray-900 border-2 border-gray-100 rounded-full font-bold hover:bg-gray-50 transition-all shadow-sm active:scale-95"
        >
          <RefreshCw className="w-5 h-5" />
          진단 다시 하기
        </button>
      </div>

      {/* Career Detail Modal */}
      <AnimatePresence>
        {selectedCareer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCareer(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => setSelectedCareer(null)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>

              <div className="overflow-y-auto p-8 md:p-12">
                {loadingDetail ? (
                  <div className="py-20 flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                    <p className="text-gray-500 font-medium animate-pulse">상세 정보를 분석하고 번역하는 중...</p>
                  </div>
                ) : careerDetail ? (
                  <div className="space-y-8">
                    <header className="space-y-2">
                      <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-wider">
                        <Briefcase className="w-4 h-4" />
                        Career Profile
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">{careerDetail.title}</h2>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {selectedCareer.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </header>

                    <section className="space-y-4">
                      <p className="text-gray-600 leading-relaxed text-lg italic break-keep whitespace-pre-line">
                        "{careerDetail.description}"
                      </p>
                    </section>

                    <div className="grid md:grid-cols-2 gap-8">
                      <section className="space-y-4">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          주요 업무
                        </h3>
                        <ul className="space-y-2">
                          {careerDetail.keyTasks.map((task, i) => (
                            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-gray-300 mt-2 shrink-0" />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </section>

                      <section className="space-y-4">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                          <Zap className="w-5 h-5 text-yellow-500" />
                          필요 역량
                        </h3>
                        <ul className="space-y-2">
                          {careerDetail.requiredSkills.map((skill, i) => (
                            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-gray-300 mt-2 shrink-0" />
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </section>
                    </div>

                    <section className="p-6 bg-indigo-50 rounded-2xl space-y-3">
                      <h3 className="font-bold text-indigo-900 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        시장 전망 및 가치
                      </h3>
                      <p className="text-sm text-indigo-800 leading-relaxed">
                        {careerDetail.marketOutlook}
                      </p>
                    </section>

                    <section className="p-6 bg-amber-50 rounded-2xl space-y-3">
                      <h3 className="font-bold text-amber-900 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        준비 가이드
                      </h3>
                      <p className="text-sm text-amber-800 leading-relaxed">
                        {careerDetail.advice}
                      </p>
                    </section>

                    {/* Roadmap Section */}
                    <section className="pt-4 border-t border-gray-100">
                      {!roadmap ? (
                        <button
                          onClick={handleGenerateRoadmap}
                          disabled={loadingRoadmap}
                          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 disabled:opacity-50"
                        >
                          {loadingRoadmap ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              맞춤형 로드맵 설계 중...
                            </>
                          ) : (
                            <>
                              <Map className="w-5 h-5" />
                              나만의 3단계 로드맵 생성하기
                            </>
                          )}
                        </button>
                      ) : (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                              <Map className="w-6 h-6 text-indigo-600" />
                              {roadmap.title}
                            </h3>
                            <button
                              onClick={downloadRoadmap}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors"
                            >
                              <Download className="w-4 h-4" />
                              다운로드
                            </button>
                          </div>

                          {/* Persona Section */}
                          <div className="p-6 bg-white border-2 border-indigo-100 rounded-3xl space-y-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                              <Award className="w-24 h-24 text-indigo-600" />
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 font-bold text-2xl">
                                {roadmap.persona.name[0]}
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900 text-lg">{roadmap.persona.name} 멘토</h4>
                                <p className="text-sm text-indigo-600 font-medium">{roadmap.persona.years}년차 · {roadmap.persona.role}</p>
                              </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed italic relative z-10 break-keep whitespace-pre-line">
                              "{roadmap.persona.intro}"
                            </p>
                          </div>

                          <div className="space-y-4 relative before:absolute before:left-4 before:top-8 before:bottom-8 before:w-0.5 before:bg-indigo-100">
                            {roadmap.steps.map((step, i) => (
                              <div key={i} className="relative pl-10">
                                <div className="absolute left-0 top-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm z-10 shadow-md">
                                  {i + 1}
                                </div>
                                <div className="p-5 bg-white border border-indigo-50 rounded-2xl shadow-sm space-y-3">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-bold text-gray-900">{step.title}</h4>
                                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                                      {step.period}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                                  <div className="flex flex-wrap gap-2">
                                    {step.actions.map((action, j) => (
                                      <span key={j} className="text-[11px] bg-gray-50 text-gray-500 px-2 py-1 rounded-lg border border-gray-100">
                                        • {action}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="p-4 bg-indigo-900 text-white rounded-2xl">
                            <p className="text-xs text-indigo-200 uppercase tracking-widest font-bold mb-1">Final Goal</p>
                            <p className="font-medium">{roadmap.finalGoal}</p>
                          </div>
                        </div>
                      )}
                    </section>

                    <footer className="pt-6 flex justify-end">
                      <button
                        onClick={() => setSelectedCareer(null)}
                        className="px-6 py-2 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-colors text-sm"
                      >
                        닫기
                      </button>
                    </footer>
                  </div>
                ) : (
                  <div className="py-20 text-center text-gray-500">
                    정보를 불러오지 못했습니다.
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
