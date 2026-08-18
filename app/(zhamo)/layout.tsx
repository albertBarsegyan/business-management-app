import type { Metadata } from "next";
import { zhamoFontVariables } from "@/shared/config/zhamo-fonts";

export const metadata: Metadata = {
  title: "Zhamo",
  description: "Zhamo — booking and front-desk system for service businesses.",
};

export default function ZhamoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={zhamoFontVariables}
      style={{
        fontFamily: "var(--font-zhamo-sans), Helvetica, Arial, sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {children}
    </div>
  );
}
