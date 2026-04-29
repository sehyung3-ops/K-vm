"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Timer, Inbox, Map } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  // Hide nav on timer screen when in focus mode
  // The timer page handles its own focus mode logic, but typically the nav is hidden.
  // For now, we'll keep it simple: if the body has "focus-mode" class, the nav will hide via CSS.
  // We can just rely on the CSS we'll add.

  const navItems = [
    { name: "오늘", path: "/", icon: Compass },
    { name: "집중", path: "/timer", icon: Timer },
    { name: "정보", path: "/info", icon: Inbox },
    { name: "나침반", path: "/compass", icon: Map },
  ];

  return (
    <nav className="bottom-nav flex justify-around items-center w-full bg-white/95 backdrop-blur-md pb-safe pt-3 pb-3 border-t border-slate-100 fixed bottom-0 left-0 z-50 transition-transform duration-300">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.name}
            href={item.path}
            className={`flex flex-col items-center w-1/4 gap-1 ${
              isActive ? "text-indigo-600" : "text-slate-400"
            }`}
          >
            <Icon
              className={`w-6 h-6 transition-transform ${
                isActive ? "-translate-y-1" : ""
              }`}
            />
            <span className="text-[11px] font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
