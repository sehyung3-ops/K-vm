"use client";

import { useAppContext } from "@/context/AppContext";
import { PieChart, Lightbulb, Route, ChevronRight } from "lucide-react";

export default function Compass() {
  const { data } = useAppContext();

  return (
    <div className="p-5 pt-safe">
      <header className="mb-6 pt-2">
        <h1 className="text-2xl font-bold text-slate-800">진로 나침반 🧭</h1>
        <p className="text-sm text-slate-500 mt-1">
          입력하지 않아도, 활동 패턴으로 나를 알아가기
        </p>
      </header>

      {/* Focus Sessions (from mock and real) */}
      {data.focusSessions.length > 0 && (
        <div className="bg-white rounded-2xl p-5 mb-5 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 최근 완료한 집중
          </h3>
          <div className="space-y-2">
            {data.focusSessions.slice().reverse().map((session, idx) => (
              <div key={idx} className="text-sm flex justify-between items-center py-1">
                <span className="text-slate-700 font-medium">{session.goal}</span>
                <span className="text-slate-400 text-xs">
                  {session.date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })} 
                  (이탈 {session.interruptions}회)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Career Signals */}
      <div className="bg-indigo-50/50 rounded-2xl p-5 mb-5 shadow-sm border border-indigo-50">
        <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
          <PieChart className="text-indigo-500 w-5 h-5" /> 이번 주 몰입 신호
        </h3>
        <div className="space-y-3">
          {data.careerSignals.map((signal, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-slate-700">{signal.category}</span>
                <span className="text-indigo-600 font-bold">{signal.time}</span>
              </div>
              <div className="w-full bg-indigo-100 rounded-full h-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: `${signal.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="bg-white rounded-2xl p-5 mb-5 border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Lightbulb className="text-amber-500 w-5 h-5" /> 탐색 가능성이 높은 직무 (관심 후보)
        </h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">서비스 기획</span>
          <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">데이터 분석</span>
          <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">콘텐츠 구성</span>
        </div>
        <p className="text-xs text-slate-500 mt-4 leading-relaxed">
          회원님의 과제 집중 패턴을 분석해 보았을 때, 위 분야에서 몰입 신호가 자주 나타났습니다.
        </p>
      </div>

      {/* Next Actions */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-5 text-white shadow-md">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Route className="text-emerald-400 w-5 h-5" /> 다음 행동 추천
        </h3>
        <div className="space-y-2">
          {[
            "진로상담센터 예약하기",
            "관련 비교과 프로그램 보기",
            "다음 주 기획 활동 1회 더 시도",
          ].map((action, idx) => (
            <div
              key={idx}
              className="bg-white/10 p-3 rounded-xl flex items-center justify-between cursor-pointer active:bg-white/20 transition"
            >
              <span className="text-sm font-medium">{action}</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
