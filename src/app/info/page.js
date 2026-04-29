"use client";

import { useAppContext } from "@/context/AppContext";

export default function Info() {
  const { data } = useAppContext();

  return (
    <div className="p-5 pt-safe">
      <header className="mb-6 pt-2">
        <h1 className="text-2xl font-bold text-slate-800">핵심 학교 정보</h1>
        <p className="text-sm text-slate-500 mt-1">
          정보의 홍수 속에서 오늘 필요한 것만
        </p>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-2 hide-scrollbar">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium whitespace-nowrap shadow-sm">
          전체
        </button>
        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-full text-sm font-medium whitespace-nowrap">
          장학금
        </button>
        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-full text-sm font-medium whitespace-nowrap">
          취업/인턴
        </button>
        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-full text-sm font-medium whitespace-nowrap">
          수업/학사
        </button>
        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-full text-sm font-medium whitespace-nowrap">
          비교과
        </button>
      </div>

      <div className="space-y-4">
        {data.notices.map((notice) => (
          <div key={notice.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-50">
            <div className="flex justify-between items-center mb-3">
              <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-bold">
                {notice.tag}
              </span>
              <span className="text-indigo-600 font-bold text-sm">
                {notice.dueDate}
              </span>
            </div>
            <h3 className="font-bold text-slate-800 text-lg mb-3 leading-snug">
              {notice.title}
            </h3>
            <ul className="text-sm text-slate-600 mb-5 space-y-1.5">
              {notice.summary.split("\n").map((line, idx) => (
                <li key={idx}>• {line}</li>
              ))}
            </ul>
            <div className="flex gap-2">
              <button className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-bold shadow-sm active:scale-95 transition">
                일정에 추가
              </button>
              <button className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-xl text-sm font-bold active:bg-slate-200 transition">
                원문 보기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
