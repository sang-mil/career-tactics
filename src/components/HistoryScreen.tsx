import React from 'react';
import { motion } from 'motion/react';
import { UserSession } from '../types';
import { Clock, ChevronRight, ArrowLeft, Trash2, Calendar, Award } from 'lucide-react';

interface HistoryScreenProps {
  sessions: UserSession[];
  onSelectSession: (session: UserSession) => void;
  onDeleteSession: (sessionId: string) => void;
  onBack: () => void;
}

export default function HistoryScreen({ sessions, onSelectSession, onDeleteSession, onBack }: HistoryScreenProps) {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
      <header className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          돌아가기
        </button>
        <h1 className="text-3xl font-bold text-gray-900">나의 진단 기록</h1>
        <div className="w-24" /> {/* Spacer */}
      </header>

      {sessions.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
          <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">아직 저장된 진단 기록이 없습니다.</p>
          <p className="text-gray-400 text-sm mt-1">새로운 퀘스트를 시작하여 커리어 리포트를 생성해보세요!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {sessions.map((session, idx) => (
            <motion.div
              key={session.createdAt}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-200 transition-all group flex items-center justify-between"
            >
              <div 
                className="flex-grow cursor-pointer flex items-center gap-6"
                onClick={() => onSelectSession(session)}
              >
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <Award className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">
                    {session.aiReport?.title || '진단 리포트'}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(session.createdAt).toLocaleDateString()}
                    </span>
                    <span className="px-2 py-0.5 bg-gray-50 rounded text-[10px] font-bold uppercase tracking-wider">
                      {session.level === 'elementary' ? '초등' : session.level === 'middle' ? '중등' : session.level === 'high' ? '고등' : '대학/일반'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDeleteSession(session.createdAt)} // Using createdAt as a simple ID for now if not provided
                  className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  title="기록 삭제"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onSelectSession(session)}
                  className="p-2 text-gray-300 group-hover:text-indigo-600 group-hover:bg-indigo-50 rounded-xl transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
