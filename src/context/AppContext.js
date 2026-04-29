"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const initialData = {
  goals: [
    { id: 1, title: '알고리즘 과제 제출', reason: '마감 D-1 · 예상 소요 60분 · 수업 후 공강 90분', isMain: true, category: '과제' },
    { id: 2, title: '영어 회화 스터디 준비', reason: '마감 D-2', isMain: false, category: '비교과' },
    { id: 3, title: '데이터베이스 복습', reason: '중간고사 대비', isMain: false, category: '수업' },
    { id: 4, title: '이력서 초안 작성', reason: '취업 준비', isMain: false, category: '기타' }
  ],
  notices: [
    { id: 1, tag: '장학금', dueDate: 'D-2', title: '2026학년도 1학기 국가장학금 2차 신청 안내', summary: '놓치지 말고 기한 내 신청하세요.\n가구원 동의 절차가 필수입니다.\n신청 마감일이 임박했습니다.', type: 'urgent' },
    { id: 2, tag: '취업/인턴', dueDate: 'D-5', title: 'IT 기업 연합 캠퍼스 리크루팅 안내', summary: '네이버, 카카오 등 주요 IT기업 채용 설명회.\n장소는 학생회관 1층 대강당입니다.\n사전 신청자 우선 입장 가능.', type: 'normal' },
    { id: 3, tag: '비교과', dueDate: 'D-7', title: '창업 동아리 신규 부원 모집', summary: '앱 서비스 기획 및 개발 경험을 쌓으세요.\n활동 지원금 지급 및 멘토링 제공.\n매주 수요일 정기 모임.', type: 'normal' }
  ],
  careerSignals: [
    { category: '기획/자료정리', time: '2시간 40분', percent: 65 },
    { category: '개발/코딩', time: '1시간 20분', percent: 35 },
    { category: '발표/커뮤니케이션', time: '1시간 10분', percent: 30 }
  ],
  focusSessions: []
};

export function AppProvider({ children }) {
  const [data, setData] = useState(initialData);
  const [selectedGoalId, setSelectedGoalId] = useState(1);

  const addSession = (session) => {
    setData((prev) => ({
      ...prev,
      focusSessions: [...prev.focusSessions, session],
    }));
  };

  return (
    <AppContext.Provider value={{ data, addSession, selectedGoalId, setSelectedGoalId }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
