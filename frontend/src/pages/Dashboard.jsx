import WrappedCard from "../components/WrappedCard"
import StatsGrid from "../components/StatsGrid"
import CommitTypeChart from "../components/CommitTypeChart"
import ProductivityScore from "../components/ProductivityScore"
import HourlyChart from "../components/HourlyChart"

const stripEmoji = str => str?.replace(/[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27FF}]|[\u{1F300}-\u{1F9FF}]|[\u{FE00}-\u{FEFF}]/gu, "").trim() || ""

export default function Dashboard({ report, onReset }) {
  return (
    <div style={s.root}>
      <div style={s.grid} />
      <header style={s.header}>
        <span style={s.logo}>CODEBLOOD</span>
        <div style={s.headerRight}>
          <span style={s.tag}>ANALYSIS COMPLETE</span>
          <button onClick={onReset} style={s.resetBtn}
            onMouseEnter={e => e.target.style.color = "#bf5af2"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}>
            NEW ANALYSIS →
          </button>
        </div>
      </header>
      <main style={s.main}>
        <div style={s.topRow}>
          <WrappedCard report={report} />
          <StatsGrid report={report} />
        </div>
        <div style={s.midRow}>
          <ProductivityScore report={report} />
          <HourlyChart peakHour={report.peak_hour} totalCommits={report.total_commits} />
        </div>
        <CommitTypeChart distribution={report.type_distribution} total={report.total_commits} />
        {report.narrative && (
          <div style={s.narrative}>
            <div style={s.narrativeLabel}>AI BEHAVIORAL PROFILE</div>
            <p style={s.narrativeText}>{stripEmoji(report.narrative)}</p>
          </div>
        )}
      </main>
    </div>
  )
}

const s = {
  root: { minHeight: "100vh", background: "#0d0010", color: "#f0f0f0", fontFamily: "'DM Mono','Courier New',monospace", position: "relative" },
  grid: { position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(191,90,242,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(191,90,242,0.03) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none", zIndex: 0 },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 48px", borderBottom: "1px solid rgba(191,90,242,0.12)", position: "sticky", top: 0, background: "rgba(13,0,16,0.95)", backdropFilter: "blur(12px)", zIndex: 10 },
  logo: { fontSize: "13px", fontWeight: "700", letterSpacing: "0.2em", color: "#bf5af2" },
  headerRight: { display: "flex", alignItems: "center", gap: "32px" },
  tag: { fontSize: "10px", letterSpacing: "0.2em", color: "rgba(191,90,242,0.5)" },
  resetBtn: { background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: "11px", letterSpacing: "0.15em", cursor: "pointer", fontFamily: "inherit", transition: "color 0.2s", padding: 0 },
  main: { maxWidth: "1100px", margin: "0 auto", padding: "48px", position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "24px" },
  topRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "start" },
  midRow: { display: "grid", gridTemplateColumns: "1fr 2fr", gap: "24px", alignItems: "start" },
  narrative: { border: "1px solid rgba(191,90,242,0.2)", borderRadius: "8px", padding: "32px", background: "rgba(191,90,242,0.04)" },
  narrativeLabel: { fontSize: "10px", letterSpacing: "0.25em", color: "rgba(191,90,242,0.6)", marginBottom: "16px" },
  narrativeText: { fontSize: "15px", lineHeight: "1.8", color: "rgba(255,255,255,0.75)", margin: 0, fontFamily: "'DM Serif Display',Georgia,serif", fontStyle: "italic" },
}