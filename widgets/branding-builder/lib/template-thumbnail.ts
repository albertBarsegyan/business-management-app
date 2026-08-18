import { coverGradient, type TemplateId } from "../model/template-catalog";

export type ThumbBar = { h: string; w: string; bg: string };
export type ThumbCol = { flex: string; bars: ThumbBar[] };

export type ThumbSpec = {
  thumbBorder: string;
  thumbBg: string;
  thumbCover: string;
  thumbCoverBg: string;
  thumbInk: string;
  thumbTitleW: string;
  thumbCols: ThumbCol[];
  rowBg: string;
  selected: boolean;
};

const coverPrimary = coverGradient("oklch(0.5 0.1 350)", "oklch(0.43 0.1 350)");

const coverHeights: Record<TemplateId, string> = {
  minimal: "0px",
  editorial: "34px",
  dark: "26px",
  grid: "16px",
  clinic: "14px",
  storefront: "12px",
  timetable: "20px",
};

export function buildTemplateThumb(id: TemplateId, opts: { selectedTemplate: TemplateId; accent: string }): ThumbSpec {
  const { selectedTemplate, accent } = opts;
  const sel = selectedTemplate === id;
  const currentIsDark = selectedTemplate === "dark";
  const inkBar = currentIsDark && id === "dark" ? "rgba(255,255,255,0.5)" : "#D8DCE1";
  const bg = id === "dark" ? "#1C1C23" : "#FFFFFF";
  const ci = id === "dark" ? "rgba(255,255,255,0.45)" : "#D8DCE1";

  const cols: Record<TemplateId, ThumbCol[]> = {
    minimal: [{ flex: "1", bars: [{ h: "7px", w: "100%", bg: ci }, { h: "7px", w: "84%", bg: ci }, { h: "7px", w: "92%", bg: ci }] }],
    editorial: [
      { flex: "1", bars: [{ h: "8px", w: "100%", bg: ci }, { h: "8px", w: "70%", bg: ci }] },
      { flex: "1", bars: [{ h: "8px", w: "90%", bg: ci }, { h: "8px", w: "60%", bg: ci }] },
    ],
    dark: [{ flex: "1", bars: [{ h: "8px", w: "100%", bg: ci }, { h: "8px", w: "78%", bg: ci }, { h: "8px", w: "88%", bg: ci }] }],
    grid: [
      { flex: "1", bars: [{ h: "15px", w: "100%", bg: accent }, { h: "15px", w: "100%", bg: ci }] },
      { flex: "1", bars: [{ h: "15px", w: "100%", bg: ci }, { h: "15px", w: "100%", bg: accent }] },
      { flex: "1", bars: [{ h: "15px", w: "100%", bg: accent }, { h: "15px", w: "100%", bg: ci }] },
    ],
    clinic: [{ flex: "1", bars: [{ h: "6px", w: "100%", bg: ci }, { h: "6px", w: "100%", bg: ci }, { h: "6px", w: "100%", bg: ci }, { h: "6px", w: "100%", bg: ci }] }],
    storefront: [
      { flex: "2", bars: [{ h: "6px", w: "100%", bg: ci }, { h: "6px", w: "100%", bg: ci }, { h: "6px", w: "100%", bg: ci }, { h: "6px", w: "100%", bg: ci }] },
      { flex: "1", bars: [{ h: "30px", w: "100%", bg: ci }] },
    ],
    timetable: [{ flex: "1", bars: [{ h: "10px", w: "100%", bg: ci }, { h: "10px", w: "100%", bg: accent }, { h: "10px", w: "100%", bg: ci }] }],
  };

  return {
    thumbBorder: sel ? "#FFC935" : "#E6E8EB",
    thumbBg: bg,
    thumbCover: coverHeights[id],
    thumbCoverBg: id === "minimal" ? "transparent" : coverPrimary,
    thumbInk: id === "editorial" ? accent : inkBar,
    thumbTitleW: id === "editorial" ? "62%" : "48%",
    thumbCols: cols[id],
    rowBg: sel ? "#FFFDF6" : "#FFFFFF",
    selected: sel,
  };
}

export { coverPrimary };
