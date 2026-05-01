const HOURS = Array.from({ length: 24 }, (_, i) => i)
const fmt = h => h === 0 ? "12am" : h === 12 ? "12pm" : h < 12 ? `${h}am` : `${h - 12}pm`

function genActivity(peakHour) {
  return HOURS.map(h => {
    const dist = Math.min(Math.abs(h - peakHour), 24 - Math.abs(h - peakHour))
    return Math.exp(-dist * dist / 18) * (0.4 + Math.random() * 0.6)
  })
}

export default function HourlyChart({ peakHour }) {
  const activity = genActivity(peakHour ?? 14)
  const max = Math.max(...activity)
  const SHOW = [0, 6, 12, 18, 23]
  return (
    <div style={s.card}>
      <div style={s.topLine}>
        <span style={s.label}>ACTIVITY BY HOUR</span>
        <span style={s.index}>06</span>
      </div>
      <div style={s.bars}>
        {activity.map((val, h) => (
          <div key={h} style={s.barCol} title={fmt(h)}>
            <div style={{
              ...s.bar,
              height: `${Math.max(4, (val / max) * 100)}%`,
              background: h === peakHour ? "#a855f7" : "rgba(255,255,255,0.12)",
              boxShadow: h === peakHour ? "0 0 8px rgba(168,85,247,0.5)" : "none",
            }} />
          </div>
        ))}
      </div>
      <div style={s.xAxis}>
        {HOURS.map(h => (
          <div key={h} style={s.xLabel}>{SHOW.includes(h) ? fmt(h) : ""}</div>
        ))}
      </div>
      <div style={s.legend}>
        <div style={s.legendItem}><div style={{ ...s.ldot, background: "#a855f7" }} /><span>Peak — {fmt(peakHour)}</span></div>
        <div style={s.legendItem}><div style={{ ...s.ldot, background: "rgba(255,255,255,0.12)" }} /><span>Estimated activity</span></div>
      </div>
    </div>
  )
}

const s = {
  card: { border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "24px", background: "rgba(255,255,255,0.02)" },
  topLine: { display: "flex", justifyContent: "space-between", marginBottom: "20px" },
  label: { fontSize: "10px", letterSpacing: "0.25em", color: "rgba(168,85,247,0.8)" },
  index: { fontSize: "11px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" },
  bars: { display: "flex", alignItems: "flex-end", height: "100px", gap: "3px" },
  barCol: { flex: 1, height: "100%", display: "flex", alignItems: "flex-end" },
  bar: { width: "100%", borderRadius: "2px 2px 0 0", minHeight: "4px" },
  xAxis: { display: "flex", paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "4px" },
  xLabel: { flex: 1, fontSize: "9px", color: "rgba(255,255,255,0.25)", textAlign: "center", letterSpacing: "0.05em" },
  legend: { display: "flex", gap: "24px", marginTop: "16px" },
  legendItem: { display: "flex", alignItems: "center", gap: "8px", fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" },
  ldot: { width: "8px", height: "8px", borderRadius: "2px" },
}