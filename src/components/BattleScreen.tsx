import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Choice, GameEvent } from '../types';
import { Sword, Zap, Info } from 'lucide-react';

interface BattleScreenProps {
  events: GameEvent[];
  onComplete: (choices: Choice[]) => void;
  title?: string;
}

export default function BattleScreen({ events, onComplete, title: screenTitle }: BattleScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [choices, setChoices] = useState<Choice[]>([]);
  
  const currentEvent = events[currentIndex];

  const handleChoice = (optionId: string) => {
    const option = currentEvent.options.find(o => o.id === optionId)!;
    const newChoice: Choice = {
      eventId: currentEvent.event_id,
      selectedOption: optionId,
      traits: option.traits,
      weight: option.weight || 1
    };

    const updatedChoices = [...choices, newChoice];
    setChoices(updatedChoices);

    if (currentIndex < events.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(updatedChoices);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {screenTitle && (
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 font-display">{screenTitle}</h2>
        </div>
      )}
      <div className="mb-8 flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Sword className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">미션: {currentEvent.title}</h3>
            <p className="text-xs text-gray-500">이벤트 {currentIndex + 1} / {events.length}</p>
          </div>
        </div>
        <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-indigo-600"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / events.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="aspect-video bg-gray-900 relative flex items-center justify-center p-8 overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20" 
                 style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            
            <div className="relative z-10 text-center max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] mb-4 block"
              >
                Mission Objective
              </motion.span>
              <motion.p 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-lg"
              >
                {currentEvent.question}
              </motion.p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse delay-75" />
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse delay-150" />
            </div>
          </div>

          <div className="p-6 md:p-10 grid gap-3">
            {currentEvent.options.map((option, idx) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.01, x: 8 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleChoice(option.id)}
                className="group relative flex items-center text-left p-6 rounded-2xl border-2 border-gray-100 hover:border-indigo-500 hover:bg-indigo-50/30 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center font-bold text-gray-400 transition-all mr-6 shrink-0 shadow-inner group-hover:shadow-indigo-200">
                  {option.id}
                </div>
                <span className="text-lg font-semibold text-gray-700 group-hover:text-indigo-900 transition-colors leading-snug">
                  {option.text}
                </span>
                
                {/* Hover Indicator */}
                <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Select</span>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <Zap className="w-5 h-5 text-indigo-600 fill-indigo-600" />
                    </motion.div>
                  </div>
                </div>

                {/* Subtle Left Border Accent */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-1/2 bg-indigo-600 rounded-r-full transition-all duration-300" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center gap-2 text-gray-400 text-sm justify-center">
        <Info className="w-4 h-4" />
        <span>당신의 선택은 자연스러운 성향을 반영합니다. 정답은 없으니 편하게 선택하세요.</span>
      </div>
    </div>
  );
}
