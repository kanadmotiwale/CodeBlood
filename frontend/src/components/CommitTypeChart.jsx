const COLORS = { bug_fix: "#ff6b6b", feature: "#e2ff00", refactor: "#4ecdc4", docs: "#a8a8ff", chore: "rgba(255,255,255,0.2)" }
const LABELS = { bug_fix: "Bug Fix", feature: "Feature", refactor: "Refactor", docs: "Docs", chore: "Chore" }

export default function CommitTypeChart({ distribution, total }) {
  if (!distribution || !total) return null
  const sorted = Object.entries(distribution).sort(([, a], [, b]) => b - a)
  return (
    <div style={s.card}>
      <div style={s.topLine}>
        <span style={s.label}>COMMIT BREAKDOWN</span>
        <span style={s.index}>04</span>
      </div>
      <div style={s.barTrack}>
        {sorted.map(([type, count]) => (
          <div key={type} title={`${LABELS[type] || type}: ${count}`}
            style={{ ...s.barSegment, width: `${count / total * 100}%`, background: COLORS[type] || "rgba(255,255,255,0.2)" }} />
        ))}
      </div>
      <div style={s.legend}>
        {sorted.map(([type, count]) => (
          <div key={type} style={s.legendItem}>
            <div style={{ ...s.dot, background: COLORS[type] || "rgba(255,255,255,0.2)" }} />
            <span style={s.typeName}>{LABELS[type] || type}</span>
            <span style={s.typeCount}>{count}</span>
            <span style={s.typePct}>{Math.round(count / total * 100)}%</span>
            <div style={s.legendBar}>
              <div style={{ ...s.legendBarFill, width: `${count / total * 100}%`, background: COLORS[type] || "rgba(255,255,255,0.2)" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const s = {
  card: { border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "32px", background: "rgba(255,255,255,0.02)" },
  topLine: { display: "flex", justifyContent: "space-between", marginBottom: "24px" },
  label: { fontSize: "10px", letterSpacing: "0.25em", color: "rgba(255,255,255,0.3)" },
  index: { fontSize: "11px", color: "rgba(255,255,255,0.15)", letterSpacing: "0.1em" },
  barTrack: { display: "flex", height: "6px", borderRadius: "3px", overflow: "hidden", gap: "2px", marginBottom: "32px" },
  barSegment: { height: "100%", borderRadius: "2px", minWidth: "4px" },
  legend: { display: "flex", flexDirection: "column", gap: "12px" },
  legendItem: { display: "grid", gridTemplateColumns: "10px 80px 40px 40px 1fr", alignItems: "center", gap: "12px" },
  dot: { width: "8px", height: "8px", borderRadius: "50%" },
  typeName: { fontSize: "12px", color: "rgba(255,255,255,0.5)" },
  typeCount: { fontSize: "13px", fontWeight: "600", color: "#f0f0f0" },
  typePct: { fontSize: "11px", color: "rgba(255,255,255,0.25)" },
  legendBar: { height: "3px", background: "rgba(255,255,255,0.05)", borderRadius: "2px", overflow: "hidden" },
  legendBarFill: { height: "100%", borderRadius: "2px", opacity: 0.6 },
}