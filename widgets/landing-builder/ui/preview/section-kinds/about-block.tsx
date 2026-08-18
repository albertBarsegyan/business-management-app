export function AboutBlock({ cols, order, photoOrder, ink, coverBg }: { cols: string; order: string; photoOrder: string; ink: string; coverBg: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: cols, gap: 18, alignItems: "center" }}>
      <span style={{ fontSize: 13.5, lineHeight: 1.65, color: ink, order }}>
        Aram opened one chair on Abovyan Street in 2016. Ten years later there are four, the same espresso machine, and a rule that nobody waits longer than five minutes past their time.
      </span>
      <span style={{ minHeight: 150, borderRadius: 10, background: coverBg, order: photoOrder }} />
    </div>
  );
}
