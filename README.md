# University Compass 🧭

**University Compass**는 수많은 학교 공지, 과제, 시험, 진로 고민으로 인해 주의가 산만해진 대학생들을 위한 맞춤형 '집중 나침반' 서비스입니다. 기존의 복잡한 캘린더나 투두리스트 앱과 달리, 사용자 입력을 최소화하고 흩어진 학사 정보를 큐레이션하여 '오늘 당장 집중해야 할 단 하나의 목표'를 명확하게 제시합니다.

## ✨ 주요 기능 (MVP)

1. **오늘의 나침반 (홈 화면)**
   - 오늘 가장 중요하게 처리해야 할 1순위 목표를 제시합니다.
   - 불필요한 리스트를 배제하고 핵심 목표(Top 3)만을 직관적인 카드 형태로 보여줍니다.
   - 다가오는 주요 학교 일정을 요약하여 노출합니다.

2. **집중 (타이머 & Focus Mode)**
   - 목표를 선택하고 타이머를 시작하면 화면이 즉시 다크 네이비 테마(Focus Mode)로 전환되며 하단 네비게이션과 불필요한 UI가 숨겨집니다.
   - 브라우저 이탈(다른 탭/앱 전환)을 감지하여 `이탈 횟수`를 기록하며, 방해 요소를 최소화하여 강력한 몰입 환경을 조성합니다.

3. **핵심 학교 정보 큐레이션**
   - 정보의 홍수 속에서 꼭 필요한 장학금, 취업/인턴, 학사, 비교과 공지만을 필터링해 제공합니다.
   - 3줄 요약 카드 형태로 제공되어 무한 스크롤의 피로감을 줄였습니다.

4. **진로 나침반**
   - 직접적인 설문조사 없이 사용자가 완료한 과제와 타이머(집중 세션) 데이터를 분석하여 관심 직무를 추천합니다.
   - '이번 주 몰입 신호' 통계를 통해 자신의 성향을 돌아보고, 다음 행동(상담, 비교과 신청 등)을 안내합니다.

## 🛠️ 기술 스택 (Tech Stack)

이 프로젝트는 초기 단일 바닐라 JS(HTML) 형태의 프로토타입에서 확장성과 유지보수를 위해 **Next.js 구조로 전면 마이그레이션** 되었습니다.

- **Framework**: [Next.js (App Router)](https://nextjs.org/) v15+ 
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API (`AppContext.js`)

## 📂 프로젝트 구조

```text
├── src/
│   ├── app/
│   │   ├── layout.js       # 전역 레이아웃 및 폰트, 공통 Provider
│   │   ├── page.js         # 메인 홈 (오늘의 나침반)
│   │   ├── compass/        # 진로 나침반 페이지
│   │   ├── info/           # 핵심 학교 정보 페이지
│   │   └── timer/          # 집중 모드 타이머 페이지
│   ├── components/
│   │   └── BottomNav.js    # 4-Tab 하단 네비게이션 컴포넌트
│   └── context/
│       └── AppContext.js   # mockData 및 타이머 이탈 횟수 등 전역 상태 관리
├── public/                 # 정적 리소스 파일
└── next.config.mjs         # Next.js 환경 설정
```

## 🚀 로컬 실행 방법 (Getting Started)

1. 저장소를 클론(Clone)합니다.
   ```bash
   git clone https://github.com/sehyung3-ops/K-vm.git
   cd K-vm
   ```

2. 패키지를 설치합니다.
   ```bash
   npm install
   ```

3. 개발 서버를 실행합니다.
   ```bash
   npm run dev
   ```

4. 브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 결과를 확인합니다. 모바일 해상도(최대 너비 430px)에 최적화되어 있으므로 브라우저의 개발자 도구를 열고 모바일 기기 모드로 테스트하시는 것을 권장합니다.

## 💡 개발 시 유의사항
- **Focus Mode 전환**: `app/timer/page.js`에서 타이머 작동 시 `document.body.classList.add("focus-mode")`를 통해 전역 스타일을 제어합니다.
- **화면 이탈 감지**: `visibilitychange` 이벤트를 리스닝하여 사용자가 탭이나 브라우저를 벗어나는 행위를 카운트합니다.
- 현재의 데이터(`mockData`)는 `context/AppContext.js` 내에 하드코딩 되어 있으며, 추후 실제 백엔드 API나 DB(Supabase 등)와 연결되도록 확장할 수 있습니다.
