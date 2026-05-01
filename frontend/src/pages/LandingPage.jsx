import { useState } from "react"

const API_BASE = "https://codeblood-01hl.onrender.com"

export default function LandingPage({ onAnalyze }) {
  const [username, setUsername] = useState("")
  const [repo, setRepo] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    if (!username.trim()) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`${API_BASE}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ github_username: username, repo_name: repo || null })
      })
      if (!res.ok) throw new Error("Analysis failed")
      const data = await res.json()
      onAnalyze(data)
    } catch (err) {
      setError("Could not analyze. Check the username and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.root}>
      <div style={styles.grid} />
      <header style={styles.header}>
        <span style={styles.logo}>CODEBLOOD</span>
        <span style={styles.version}>v1.0</span>
      </header>
      <main style={styles.main}>
        <div style={styles.eyebrow}>DEVELOPER PSYCHOLOGY ENGINE</div>
        <h1 style={styles.headline}>
          Your commits<br />
          <span style={styles.accent}>reveal everything.</span>
        </h1>
        <p style={styles.sub}>
          We analyze your Git history to map behavioral patterns,
          coding psychology, and work habits. No fluff — just data.
        </p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputRow}>
            <div style={styles.inputWrap}>
              <label style={styles.label}>GITHUB USERNAME</label>
              <input
                type="text"
                placeholder="e.g. torvalds"
                value={username}
                onChange={e => setUsername(e.target.value)}
                style={styles.input}
                onFocus={e => e.target.style.borderColor = "#e2ff00"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"}
              />
            </div>
            <div style={styles.inputWrap}>
              <label style={styles.label}>REPOSITORY <span style={styles.optional}>(OPTIONAL)</span></label>
              <input
                type="text"
                placeholder="Leave blank to analyze all"
                value={repo}
                onChange={e => setRepo(e.target.value)}
                style={styles.input}
                onFocus={e => e.target.style.borderColor = "#e2ff00"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"}
              />
            </div>
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.btn, ...(loading ? styles.btnLoading : {}) }}
            onMouseEnter={e => { if (!loading) { e.target.style.background = "#e2ff00"; e.target.style.color = "#0a0a0a" } }}
            onMouseLeave={e => { if (!loading) { e.target.style.background = "transparent"; e.target.style.color = "#e2ff00" } }}
          >
            {loading ? "ANALYZING COMMITS..." : "RUN ANALYSIS →"}
          </button>
        </form>
        <div style={styles.stats}>
          {["Commit patterns", "Behavioral signals", "AI profile", "Work psychology"].map(s => (
            <div key={s} style={styles.statItem}>
              <div style={styles.dot} />
              <span>{s}</span>
            </div>
          ))}
        </div>
      </main>
      <footer style={styles.footer}>
        <span>Works on any public GitHub profile</span>
        <span style={styles.footerDivider}>—</span>
        <span>No account needed</span>
      </footer>
    </div>
  )
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#0a0a0a",
    color: "#f0f0f0",
    fontFamily: "'DM Mono', 'Courier New', monospace",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
    backgroundSize: "60px 60px",
    pointerEvents: "none",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "28px 48px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    position: "relative",
    zIndex: 1,
  },
  logo: {
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "0.2em",
    color: "#e2ff00",
  },
  version: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.3)",
    letterSpacing: "0.1em",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "80px 48px",
    maxWidth: "760px",
    position: "relative",
    zIndex: 1,
  },
  eyebrow: {
    fontSize: "11px",
    letterSpacing: "0.25em",
    color: "rgba(255,255,255,0.35)",
    marginBottom: "24px",
  },
  headline: {
    fontSize: "clamp(42px, 6vw, 72px)",
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontWeight: "400",
    lineHeight: "1.05",
    margin: "0 0 24px 0",
    color: "#f0f0f0",
  },
  accent: {
    color: "#e2ff00",
    fontStyle: "italic",
  },
  sub: {
    fontSize: "15px",
    lineHeight: "1.7",
    color: "rgba(255,255,255,0.45)",
    maxWidth: "480px",
    margin: "0 0 48px 0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "600px",
  },
  inputRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  inputWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "10px",
    letterSpacing: "0.2em",
    color: "rgba(255,255,255,0.3)",
  },
  optional: {
    color: "rgba(255,255,255,0.2)",
  },
  input: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "4px",
    padding: "14px 16px",
    color: "#f0f0f0",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s",
  },
  error: {
    color: "#ff6b6b",
    fontSize: "12px",
    letterSpacing: "0.05em",
  },
  btn: {
    background: "transparent",
    border: "1px solid #e2ff00",
    color: "#e2ff00",
    padding: "16px 32px",
    fontSize: "12px",
    fontFamily: "inherit",
    letterSpacing: "0.15em",
    fontWeight: "700",
    cursor: "pointer",
    borderRadius: "4px",
    transition: "all 0.2s",
    alignSelf: "flex-start",
  },
  btnLoading: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  stats: {
    display: "flex",
    gap: "32px",
    marginTop: "56px",
    flexWrap: "wrap",
  },
  statItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "11px",
    color: "rgba(255,255,255,0.3)",
    letterSpacing: "0.1em",
  },
  dot: {
    width: "4px",
    height: "4px",
    borderRadius: "50%",
    background: "#e2ff00",
  },
  footer: {
    display: "flex",
    gap: "16px",
    padding: "24px 48px",
    fontSize: "11px",
    color: "rgba(255,255,255,0.2)",
    letterSpacing: "0.08em",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    position: "relative",
    zIndex: 1,
  },
  footerDivider: {
    color: "rgba(255,255,255,0.1)",
  },
}