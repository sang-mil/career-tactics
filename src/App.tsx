/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, signInAnonymously, linkWithPopup, GoogleAuthProvider, User, browserPopupRedirectResolver } from 'firebase/auth';
import { doc, setDoc, getDoc, collection, query, where, getDocs, deleteDoc, orderBy, serverTimestamp } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from './lib/firebase';
import { UserSession, Choice, GeneratedWorld, RIASEC, UserPreferences, EducationLevel } from './types';
import { calculateRIASEC } from './lib/scoring';
import { matchCareers } from './lib/matching';
import { generateCareerReport, translateCareerDetail } from './lib/ai';
import { seedCareers } from './lib/seed';
import { CAREER_DATASET } from './data/careers';
import { LEVEL_EVENTS } from './data/events';
import Onboarding from './components/Onboarding';
import BattleScreen from './components/BattleScreen';
import ResultScreen from './components/ResultScreen';
import HistoryScreen from './components/HistoryScreen';
import WorldGenerationScreen from './components/WorldGenerationScreen';
import PreferenceSelectionScreen from './components/PreferenceSelectionScreen';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Loader2, Zap } from 'lucide-react';

type AppState = 'onboarding' | 'initial_battle' | 'preference_selection' | 'world_generation' | 'refined_battle' | 'processing' | 'result' | 'history';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [appState, setAppState] = useState<AppState>('onboarding');
  const [initialChoices, setInitialChoices] = useState<Choice[]>([]);
  const [refinedChoices, setRefinedChoices] = useState<Choice[]>([]);
  const [currentRiasec, setCurrentRiasec] = useState<RIASEC | null>(null);
  const [generatedWorld, setGeneratedWorld] = useState<GeneratedWorld | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel>('university');
  const [currentSession, setCurrentSession] = useState<UserSession | null>(null);
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        // Sync user profile
        const userRef = doc(db, 'users', u.uid);
        try {
          const userDoc = await getDoc(userRef);
          if (!userDoc.exists()) {
            await setDoc(userRef, {
              uid: u.uid,
              email: u.email || null,
              displayName: u.displayName || (u.isAnonymous ? '게스트' : '사용자'),
              photoURL: u.photoURL || null,
              role: 'user',
              createdAt: serverTimestamp()
            });
          }
        } catch (error) {
          console.error("Error syncing user profile:", error);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const startQuest = async (level: EducationLevel, method: 'google' | 'anonymous' = 'anonymous') => {
    setSelectedLevel(level);
    if (isAuthenticating) return;

    if (!user) {
      setIsAuthenticating(true);
      try {
        if (method === 'google') {
          const provider = new GoogleAuthProvider();
          await signInWithPopup(auth, provider, browserPopupRedirectResolver);
        } else {
          await signInAnonymously(auth);
        }
      } catch (error: any) {
        if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user') {
          console.log("Sign-in cancelled by user or another request.");
        } else {
          console.error("Auth error:", error);
          alert('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
        setIsAuthenticating(false);
        return;
      } finally {
        setIsAuthenticating(false);
      }
    }
    setAppState('initial_battle');
  };

  const fetchHistory = async () => {
    if (!user) return;
    setLoadingHistory(true);
    try {
      const q = query(
        collection(db, 'sessions'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const history = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id // Store the firestore ID
      } as unknown as UserSession));
      setSessions(history);
      setAppState('history');
    } catch (error) {
      console.error("Error fetching history:", error);
      handleFirestoreError(error, OperationType.LIST, 'sessions');
    } finally {
      setLoadingHistory(false);
    }
  };

  const deleteSession = async (sessionId: string) => {
    if (!confirm('정말로 이 기록을 삭제하시겠습니까?')) return;
    
    try {
      // Find the document ID. If sessionId is the firestore ID, use it.
      // In our fetchHistory we added 'id' to the object.
      const sessionToDelete = sessions.find(s => (s as any).id === sessionId || s.createdAt === sessionId);
      const id = (sessionToDelete as any)?.id || sessionId;
      
      await deleteDoc(doc(db, 'sessions', id));
      setSessions(prev => prev.filter(s => (s as any).id !== id && s.createdAt !== id));
    } catch (error) {
      console.error("Error deleting session:", error);
      handleFirestoreError(error, OperationType.DELETE, 'sessions');
    }
  };

  const linkAccount = async () => {
    if (!user || !user.isAnonymous) return;
    
    const provider = new GoogleAuthProvider();
    try {
      await linkWithPopup(user, provider, browserPopupRedirectResolver);
      alert('계정이 성공적으로 연동되었습니다! 이제 모든 기기에서 기록을 확인할 수 있습니다.');
    } catch (error: any) {
      if (error.code === 'auth/credential-already-in-use') {
        alert('이 구글 계정은 이미 다른 데이터와 연결되어 있습니다. 다른 계정을 사용하거나 로그아웃 후 다시 로그인해주세요.');
      } else {
        console.error("Error linking account:", error);
        alert('계정 연동 중 오류가 발생했습니다.');
      }
    }
  };

  const handleInitialBattleComplete = (choices: Choice[]) => {
    setInitialChoices(choices);
    const scores = calculateRIASEC(choices);
    setCurrentRiasec(scores);
    setAppState('preference_selection');
  };

  const handlePreferenceComplete = (preferences: UserPreferences) => {
    setUserPreferences(preferences);
    setAppState('world_generation');
  };

  const handleWorldReady = (world: GeneratedWorld) => {
    setGeneratedWorld(world);
    setAppState('refined_battle');
  };

  const handleRefinedBattleComplete = async (choices: Choice[]) => {
    setRefinedChoices(choices);
    setAppState('processing');
    
    try {
      const allChoices = [...initialChoices, ...choices];
      const riasecScores = calculateRIASEC(allChoices);
      const topCareers = matchCareers(riasecScores, CAREER_DATASET);
      
      // Parallelize AI report generation and career detail pre-fetching
      const reportPromise = generateCareerReport(riasecScores, topCareers, allChoices, selectedLevel);
      
      // Pre-fetch top 3 careers in parallel with the report
      const prefetchPromise = Promise.all(
        topCareers.slice(0, 3).map(async (c) => {
          const career = CAREER_DATASET.find(cd => cd.code === c.code);
          if (career) {
            try {
              const detail = await translateCareerDetail(career);
              return { code: c.code, detail };
            } catch (err) {
              console.error(`Early pre-fetch error for ${c.title}:`, err);
            }
          }
          return null;
        })
      );

      const [aiReport, prefetchResults] = await Promise.all([reportPromise, prefetchPromise]);

      const prefetchedDetails: Record<string, any> = {};
      prefetchResults.forEach(res => {
        if (res) prefetchedDetails[res.code] = res.detail;
      });

      const session: UserSession = {
        userId: user?.uid || 'anonymous',
        choices: allChoices,
        level: selectedLevel,
        riasecScores,
        topCareers,
        aiReport,
        generatedWorld: generatedWorld || undefined,
        prefetchedDetails,
        createdAt: new Date().toISOString()
      };

      // Save to Firestore (Non-blocking)
      const sessionPath = 'sessions';
      const sessionRef = doc(db, sessionPath, `${user?.uid || 'anon'}_${Date.now()}`);
      setDoc(sessionRef, {
        ...session,
        createdAt: serverTimestamp()
      }).catch(error => {
        handleFirestoreError(error, OperationType.WRITE, sessionPath);
      });

      setCurrentSession(session);
      setAppState('result');
    } catch (error) {
      console.error("Error processing results:", error);
      const allChoices = [...initialChoices, ...choices];
      const riasecScores = calculateRIASEC(allChoices);
      const topCareers = matchCareers(riasecScores, CAREER_DATASET);
      setCurrentSession({
        userId: user?.uid || 'anonymous',
        choices: allChoices,
        level: selectedLevel,
        riasecScores,
        topCareers,
        generatedWorld: generatedWorld || undefined,
        createdAt: new Date().toISOString()
      });
      setAppState('result');
    }
  };

  const handleSync = async () => {
    try {
      await seedCareers(CAREER_DATASET);
      alert('커리어 데이터가 DB에 동기화되었습니다!');
    } catch (error) {
      console.error('Sync error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <main className="container mx-auto max-w-7xl">
        {appState === 'onboarding' && (
          <>
            <Onboarding 
              onStart={startQuest} 
              onViewHistory={fetchHistory}
              isLoggedIn={!!user}
              loadingHistory={loadingHistory}
            />
            <div className="fixed bottom-4 right-4">
              <button 
                onClick={handleSync}
                className="text-[10px] text-gray-300 hover:text-gray-500 transition-colors"
              >
                데이터 동기화
              </button>
            </div>
          </>
        )}
        
        {appState === 'initial_battle' && (
          <BattleScreen 
            events={LEVEL_EVENTS[selectedLevel]} 
            onComplete={handleInitialBattleComplete} 
            title={`${selectedLevel === 'elementary' ? '초등학교' : selectedLevel === 'middle' ? '중학교' : selectedLevel === 'high' ? '고등학교' : '대학교'} 기초 성향 탐색`}
          />
        )}

        {appState === 'preference_selection' && (
          <PreferenceSelectionScreen onComplete={handlePreferenceComplete} />
        )}

        {appState === 'world_generation' && currentRiasec && userPreferences && (
          <WorldGenerationScreen 
            riasecScores={currentRiasec} 
            preferences={userPreferences}
            onWorldReady={handleWorldReady} 
          />
        )}

        {appState === 'refined_battle' && generatedWorld && (
          <BattleScreen 
            events={generatedWorld.events} 
            onComplete={handleRefinedBattleComplete} 
            title={generatedWorld.name}
          />
        )}
        
        {appState === 'processing' && (
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-6">
            <div className="relative">
              <Loader2 className="w-16 h-16 text-indigo-600 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-indigo-600 rounded-full" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 break-keep">최종 전략 데이터 분석 중...</h2>
              <p className="text-gray-500 max-w-xs mx-auto break-keep whitespace-pre-line">
                두 번의 퀘스트 데이터를 결합하여 당신의 완벽한 커리어 프로필을 생성하고 있습니다.
              </p>
            </div>
          </div>
        )}

        {appState === 'result' && currentSession && (
          <div className="space-y-8">
            {user?.isAnonymous && (
              <div className="max-w-5xl mx-auto px-4">
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-amber-900 font-bold">게스트 모드로 이용 중입니다.</p>
                      <p className="text-amber-700 text-sm">구글 계정을 연동하면 진단 결과를 영구적으로 보관할 수 있습니다.</p>
                    </div>
                  </div>
                  <button
                    onClick={linkAccount}
                    className="px-6 py-2 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-all shadow-sm"
                  >
                    계정 연동하기
                  </button>
                </div>
              </div>
            )}
            <ResultScreen 
              session={currentSession} 
              onRestart={() => {
                setAppState('onboarding');
                setInitialChoices([]);
                setRefinedChoices([]);
                setCurrentRiasec(null);
                setGeneratedWorld(null);
              }} 
            />
          </div>
        )}

        {appState === 'history' && (
          <HistoryScreen 
            sessions={sessions}
            onSelectSession={(s) => {
              setCurrentSession(s);
              setAppState('result');
            }}
            onDeleteSession={deleteSession}
            onBack={() => setAppState('onboarding')}
          />
        )}
      </main>

      <footer className="py-8 text-center text-gray-400 text-xs border-t border-gray-100 mt-12">
        <p>© 2026 sRPG 커리어 진단 서비스. All rights reserved.</p>
        <p className="mt-1">Powered by Gemini AI & RIASEC Methodology</p>
        <div className="mt-4 space-y-1 opacity-60">
          <p>This product includes data from the O*NET Database (USDOL/ETA).</p>
          <p>This data has been modified.</p>
        </div>
      </footer>
    </div>
    </ErrorBoundary>
  );
}
