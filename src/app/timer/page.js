"use client";

import { useAppContext } from "@/context/AppContext";
import { useState, useEffect, useRef } from "react";
import { Play, Square, ChevronDown } from "lucide-react";

export default function Timer() {
  const { data, selectedGoalId, setSelectedGoalId, addSession } = useAppContext();
  
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [interruptionCount, setInterruptionCount] = useState(0);
  const timerRef = useRef(null);

  // Focus mode body class
  useEffect(() => {
    if (isRunning) {
      document.body.classList.add("focus-mode");
    } else {
      document.body.classList.remove("focus-mode");
    }
    return () => document.body.classList.remove("focus-mode");
  }, [isRunning]);

  // Visibility change logic
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isRunning) {
        setInterruptionCount((prev) => prev + 1);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isRunning]);

  // Timer interval
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      handleComplete();
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setIsRunning(true);
    setIsCompleted(false);
    if (timeLeft === 25 * 60) setInterruptionCount(0);
  };

  const handleStop = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const handleComplete = () => {
    setIsRunning(false);
    setIsCompleted(true);
    clearInterval(timerRef.current);
    
    const selectedGoal = data.goals.find(g => g.id === Number(selectedGoalId));
    addSession({
      goal: selectedGoal?.title || "알 수 없는 목표",
      interruptions: interruptionCount,
      date: new Date(),
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setTimeLeft(25 * 60);
    setInterruptionCount(0);
    clearInterval(timerRef.current);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`flex flex-col justify-center min-h-[80vh] p-5 ${isRunning ? 'pt-0' : 'pt-10'}`}>
      
      {/* Header / Select Goal */}
      <div className={`text-center mb-10 transition-opacity duration-300 ${isRunning ? 'opacity-30 pointer-events-none' : ''}`}>
        <p className="text-slate-500 mb-2 font-medium">시간표/과제에서 불러온 목표</p>
        <div className="relative w-full max-w-[280px] mx-auto">
          <select
            value={selectedGoalId}
            onChange={(e) => setSelectedGoalId(Number(e.target.value))}
            className="w-full appearance-none bg-white border border-slate-200 text-slate-800 font-bold text-lg py-3 px-4 rounded-xl text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          >
            {data.goals.map((goal) => (
              <option key={goal.id} value={goal.id}>
                🎯 {goal.title}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
        </div>
      </div>

      {/* Timer Display */}
      {(!isCompleted || isRunning) && (
        <div className="text-center mb-12">
          <div className="text-7xl font-mono font-bold text-slate-800 tracking-tighter">
            {formatTime(timeLeft)}
          </div>
          {(interruptionCount > 0) && (
            <div className="mt-4 text-rose-500 font-medium bg-rose-50/10 px-4 py-1.5 rounded-full inline-block text-sm">
              이탈 횟수: <span>{interruptionCount}</span>회
            </div>
          )}
        </div>
      )}

      {/* Controls */}
      {(!isCompleted || isRunning) && (
        <div className="flex justify-center gap-6">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 transform transition active:scale-95 hover:scale-105"
            >
              <Play className="w-8 h-8 ml-1" fill="currentColor" />
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="w-20 h-20 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg transform transition active:scale-95 hover:scale-105"
            >
              <Square className="w-7 h-7" fill="currentColor" />
            </button>
          )}

          {!isRunning && timeLeft !== 25 * 60 && (
            <button
              onClick={handleReset}
              className="w-20 h-20 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shadow transform transition active:scale-95"
            >
              <Square className="w-7 h-7 text-slate-400" />
            </button>
          )}
        </div>
      )}

      {/* Focus Message */}
      {isRunning && (
        <div className="mt-12 text-center text-slate-400 text-sm animate-pulse">
          집중 중에는 앱을 건드리지 않아도 됩니다.
        </div>
      )}

      {/* Completion State */}
      {isCompleted && !isRunning && (
        <div className="text-center mt-8">
          <h2 className="text-2xl font-bold text-emerald-500 mb-2">집중 완료!</h2>
          <p className="text-slate-400 mb-6">기록이 진로 나침반에 저장되었습니다.</p>
          <div className="mb-6">
             <div className="text-rose-500 font-medium bg-rose-50/10 px-4 py-1.5 rounded-full inline-block text-sm">
              최종 이탈 횟수: <span>{interruptionCount}</span>회
            </div>
          </div>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 bg-slate-800 text-white rounded-full font-medium shadow-lg active:scale-95 transition"
          >
            새로운 집중 시작
          </button>
        </div>
      )}
    </div>
  );
}
