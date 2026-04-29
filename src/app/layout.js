import "./globals.css";
import BottomNav from "@/components/BottomNav";
import { AppProvider } from "@/context/AppContext";

export const metadata = {
  title: "University Compass",
  description: "대학생을 위한 맞춤형 집중 나침반",
  manifest: "/manifest.json",
  themeColor: "#4F46E5",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="bg-slate-200 text-slate-800 antialiased flex justify-center m-0">
        <AppProvider>
          <div id="app-container" className="w-full max-w-[430px] h-[100dvh] bg-slate-50 relative overflow-hidden flex flex-col shadow-xl">
            <main className="flex-1 overflow-y-auto pb-24">
              {children}
            </main>
            <BottomNav />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
