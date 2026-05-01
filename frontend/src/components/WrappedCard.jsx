export default function WrappedCard({ report }) {
  const { archetype, peak_hour, vague_commit_pct, panic_commits, longest_streak_days, peak_day, total_commits } = report
  const formatHour = h => `${h % 12 || 12}:00 ${h < 12 ? "AM" : "PM"}`
  const metrics = [
    { label: "PEAK HOUR", value: formatHour(peak_hour) },
    { label: "PEAK DAY", value: peak_day?.toUpperCase() },
    { label: "VAGUE COMMITS", value: `${vague_commit_pct}%` },
    { label: "PANIC COMMITS", value: panic_commits },
    { label: "LONGEST STREAK", value: `${longest_streak_days} days` },
    { label: "TOTAL COMMITS", value: total_commits },
  ]
  return (
    <div style={s.card}>
      <div style={s.topLine}>
        <span style={s.label}>DEVELOPER ARCHETYPE</span>
        <span style={s.index}>01</span>
      </div>
      <div style={s.archetypeName}>{archetype?.name?.replace("The ", "")}</div>
      <p style={s.desc}>{archetype?.description}</p>
      <div style={s.divider} />
      <div style={s.metricsGrid}>
        {metrics.map(({ label, value }) => (
          <div key={label} style={s.metric}>
            <div style={s.metricLabel}>{label}</div>
            <div style={s.metricValue}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const s = {
  card: { border: "1px solid rgba(191,90,242,0.3)", borderRadius: "8px", padding: "32px", background: "rgba(191,90,242,0.05)" },
  topLine: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
  label: { fontSize: "10px", letterSpacing: "0.25em", color: "rgba(191,90,242,0.6)" },
  index: { fontSize: "11px", color: "rgba(191,90,242,0.4)", letterSpacing: "0.1em" },
  archetypeName: { fontSize: "clamp(28px,3vw,40px)", fontFamily: "'DM Serif Display',Georgia,serif", fontWeight: "400", color: "#bf5af2", lineHeight: "1.1", marginBottom: "12px" },
  desc: { fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: "1.6", margin: "0 0 24px 0" },
  divider: { height: "1px", background: "rgba(191,90,242,0.15)", marginBottom: "24px" },
  metricsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  metric: { display: "flex", flexDirection: "column", gap: "4px" },
  metricLabel: { fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)" },
  metricValue: { fontSize: "18px", fontWeight: "600", color: "#f0f0f0", letterSpacing: "0.02em" },
}