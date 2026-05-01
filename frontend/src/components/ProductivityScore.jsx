export default function ProductivityScore({ report }) {
    const { total_commits = 0, vague_commit_pct = 0, panic_commits = 0, longest_streak_days = 0, conflict_signals = 0, type_distribution = {} } = report
    const featureRatio = (type_distribution.feature || 0) / Math.max(total_commits, 1)
    const bugRatio = (type_distribution.bug_fix || 0) / Math.max(total_commits, 1)
  
    let score = 50
    score += Math.min(featureRatio * 40, 20)
    score -= Math.min(bugRatio * 40, 20)
    score -= Math.min(vague_commit_pct * 0.3, 15)
    score -= Math.min(panic_commits * 2, 10)
    score += Math.min(longest_streak_days * 1.5, 15)
    score -= Math.min(conflict_signals * 2, 10)
    score = Math.max(0, Math.min(100, Math.round(score)))
  
    const grade = score >= 85 ? "A" : score >= 70 ? "B" : score >= 55 ? "C" : score >= 40 ? "D" : "F"
    const gradeColor = score >= 70 ? "#bf5af2" : score >= 50 ? "#a78bfa" : "#ff6b6b"
  
    const factors = [
      { label: "Feature ratio", value: `${Math.round(featureRatio * 100)}%`, positive: featureRatio > 0.3 },
      { label: "Bug fix rate", value: `${Math.round(bugRatio * 100)}%`, positive: bugRatio < 0.3 },
      { label: "Message clarity", value: `${100 - vague_commit_pct}%`, positive: vague_commit_pct < 30 },
      { label: "Consistency", value: `${longest_streak_days}d streak`, positive: longest_streak_days > 3 },
    ]
  
    return (
      <div style={s.card}>
        <div style={s.topLine}>
          <span style={s.label}>PRODUCTIVITY SCORE</span>
          <span style={s.index}>05</span>
        </div>
        <div style={s.scoreRow}>
          <div style={{ ...s.grade, color: gradeColor }}>{grade}</div>
          <div style={s.scoreNum}>{score}<span style={s.scoreMax}>/100</span></div>
        </div>
        <div style={s.scoreBar}>
          <div style={{ ...s.scoreBarFill, width: `${score}%`, background: gradeColor }} />
        </div>
        <div style={s.factors}>
          {factors.map(f => (
            <div key={f.label} style={s.factor}>
              <div style={{ ...s.factorDot, background: f.positive ? "#bf5af2" : "#ff6b6b" }} />
              <span style={s.factorLabel}>{f.label}</span>
              <span style={{ ...s.factorValue, color: f.positive ? "#f0f0f0" : "#ff6b6b" }}>{f.value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  const s = {
    card: { border: "1px solid rgba(191,90,242,0.15)", borderRadius: "8px", padding: "28px", background: "rgba(191,90,242,0.03)" },
    topLine: { display: "flex", justifyContent: "space-between", marginBottom: "24px" },
    label: { fontSize: "10px", letterSpacing: "0.25em", color: "rgba(191,90,242,0.6)" },
    index: { fontSize: "11px", color: "rgba(191,90,242,0.25)", letterSpacing: "0.1em" },
    scoreRow: { display: "flex", alignItems: "flex-end", gap: "16px", marginBottom: "16px" },
    grade: { fontSize: "56px", fontFamily: "'DM Serif Display',Georgia,serif", lineHeight: "1", fontWeight: "400" },
    scoreNum: { fontSize: "28px", fontWeight: "600", color: "#f0f0f0", paddingBottom: "6px" },
    scoreMax: { fontSize: "14px", color: "rgba(255,255,255,0.3)", fontWeight: "400" },
    scoreBar: { height: "3px", background: "rgba(191,90,242,0.15)", borderRadius: "2px", overflow: "hidden", marginBottom: "24px" },
    scoreBarFill: { height: "100%", borderRadius: "2px" },
    factors: { display: "flex", flexDirection: "column", gap: "10px" },
    factor: { display: "flex", alignItems: "center", gap: "10px" },
    factorDot: { width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0 },
    factorLabel: { fontSize: "11px", color: "rgba(255,255,255,0.35)", flex: 1 },
    factorValue: { fontSize: "12px", fontWeight: "600" },
  }