"use client";

import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { UserCircle, Compass } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { data, setSelectedGoalId } = useAppContext();
  const router = useRouter();
  const [showSettings, setShowSettings] = useState(false);

  const mainGoal = data.goals.find((g) => g.isMain) || data.goals[0];
  const topGoals = data.goals.filter((g) => !g.isMain).slice(0, 3);
  const urgentNotice = data.notices.find((n) => n.type === "urgent") || data.notices[0];

  const handleStartFocus = (id) => {
    setSelectedGoalId(id);
    router.push("/timer");
  };

  return (
    <div className="p-5 pt-safe">
      <header className="flex justify-between items-center mb-6 pt-2">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          오늘의 나침반 <Compass className="text-indigo-500 w-6 h-6" />
        </h1>
        <button
          onClick={() => setShowSettings(true)}
          className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition"
        >
          <UserCircle className="w-6 h-6" />
        </button>
      </header>

      {/* Main Goal */}
      <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-5 text-white mb-8 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-white/20 px-2 py-1 rounded text-xs font-bold backdrop-blur-sm">
            가장 중요한 목표
          </span>
        </div>
        <h2 className="text-xl font-bold mb-2 leading-tight">
          오늘은 {mainGoal.title}에 먼저 집중하세요.
        </h2>
        <p className="text-indigo-100 text-sm mb-5 opacity-90">이유: {mainGoal.reason}</p>
        <button
          onClick={() => handleStartFocus(mainGoal.id)}
          className="w-full bg-white text-indigo-600 font-bold py-3.5 rounded-xl shadow-sm active:scale-95 transition-transform"
        >
          집중 시작하기
        </button>
      </div>

      {/* Top 3 Goals */}
      <h3 className="font-bold text-slate-800 mb-3 ml-1">오늘의 핵심 목표 (Top 3)</h3>
      <div className="mb-8 space-y-3">
        {topGoals.map((goal) => (
          <div
            key={goal.id}
            className="bg-white rounded-2xl py-3.5 px-4 flex items-center justify-between border border-slate-100 shadow-sm"
          >
            <div>
              <p className="font-bold text-slate-800 text-sm">{goal.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">
                {goal.category} · {goal.reason}
              </p>
            </div>
            <button
              onClick={() => handleStartFocus(goal.id)}
              className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 hover:bg-indigo-100 active:scale-95 transition"
            >
              집중 시작
            </button>
          </div>
        ))}
      </div>

      {/* Urgent Notice */}
      <h3 className="font-bold text-slate-800 mb-3 ml-1">다가오는 학교 일정</h3>
      {urgentNotice && (
        <div className="bg-white rounded-2xl border-l-4 border-indigo-500 py-4 px-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <span className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded text-xs font-bold mb-2 inline-block">
                {urgentNotice.tag}
              </span>
              <p className="font-bold text-slate-800 text-sm leading-snug">
                {urgentNotice.title}
              </p>
            </div>
            <span className="text-rose-500 font-bold text-sm bg-rose-50 px-2 py-1 rounded">
              {urgentNotice.dueDate}
            </span>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div
          className="absolute inset-0 bg-black/40 z-[100] backdrop-blur-sm flex flex-col justify-end"
          onClick={() => setShowSettings(false)}
        >
          <div
            className="bg-white rounded-t-3xl p-6 transform transition-transform animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">설정 / 프로필</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center gap-4 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl font-bold">
                <UserCircle />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">김학생</h3>
                <p className="text-sm text-slate-500">컴퓨터공학과 3학년</p>
              </div>
            </div>
            <div className="space-y-1">
              <div className="p-3 flex justify-between items-center active:bg-slate-50 rounded-lg cursor-pointer">
                <span className="text-slate-700 font-medium">관심 직무 설정</span>
                <span className="text-slate-400">〉</span>
              </div>
              <div className="p-3 flex justify-between items-center active:bg-slate-50 rounded-lg">
                <span className="text-slate-700 font-medium">타이머 기본 시간</span>
                <span className="text-indigo-600 text-sm font-bold">25분</span>
              </div>
              <div className="p-3 flex justify-between items-center active:bg-slate-50 rounded-lg">
                <span className="text-slate-700 font-medium">알림 권한</span>
                <div className="w-10 h-6 bg-indigo-500 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
