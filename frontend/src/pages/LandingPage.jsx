import { useState } from "react"

const API_BASE = "https://codeblood-01hl.onrender.com"

const LOADING_MESSAGES = [
  "Fetching commit history...",
  "Analyzing behavioral patterns...",
  "Scoring commit quality...",
  "Detecting panic commits...",
  "Building psychological profile...",
  "Generating AI narrative...",
]

export default function LandingPage({ onAnalyze }) {
  const [username, setUsername] = useState("")
  const [repo, setRepo] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState(0)
  const [error, setError] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    if (!username.trim()) return
    setLoading(true)
    setError("")
    let msgIndex = 0
    const interval = setInterval(() => {
      msgIndex = (msgIndex + 1) % LOADING_MESSAGES.length
      setLoadingMsg(msgIndex)
    }, 1800)
    try {
      const res = await fetch(`${API_BASE}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ github_username: username, repo_name: repo || null })
      })
      if (!res.ok) throw new Error("Analysis failed")
      const data = await res.json()
      clearInterval(interval)
      onAnalyze(data)
    } catch (err) {
      clearInterval(interval)
      setError("Could not analyze. Check the username and try again.")
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={s.root}>
        <header style={s.header}>
          <span style={s.logo}>CODEBLOOD</span>
          <span style={s.version}>v1.0</span>
        </header>
        <div style={s.loadingScreen}>
          <p style={s.loadingUser}>Analyzing @{username}</p>
          <div style={s.loadingBarTrack}>
            <div style={s.loadingBarFill} />
          </div>
          <p style={s.loadingMsg}>{LOADING_MESSAGES[loadingMsg]}</p>
        </div>
        <style>{`@keyframes slide{0%{transform:translateX(-100%)}50%{transform:translateX(200%)}100%{transform:translateX(-100%)}}`}</style>
      </div>
    )
  }

  return (
    <div style={s.root}>
      <header style={s.header}>
        <span style={s.logo}>CODEBLOOD</span>
        <span style={s.version}>v1.0</span>
      </header>
      <main style={s.main}>
        <div style={s.center}>
          <div style={s.eyebrow}>DEVELOPER PSYCHOLOGY ENGINE</div>
          <h1 style={s.headline}>
            Your commits<br />
            <span style={s.accent}>reveal everything.</span>
          </h1>
          <p style={s.sub}>
            Most developers treat their Git history as a log of what they did.
            CodeBlood treats it as a window into how they think. We analyze commit
            patterns, message quality, timing, and behavioral signals to build a
            psychological profile of your engineering habits.
          </p>
          <form onSubmit={handleSubmit} style={s.form}>
            <div style={s.inputRow}>
              <div style={s.inputWrap}>
                <label style={s.label}>GITHUB USERNAME</label>
                <input type="text" placeholder="e.g. torvalds" value={username}
                  onChange={e => setUsername(e.target.value)} style={s.input}
                  onFocus={e => e.target.style.borderColor = "#a855f7"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.2)" } />
              </div>
              <div style={s.inputWrap}>
                <label style={s.label}>REPOSITORY <span style={s.optional}>(OPTIONAL)</span></label>
                <input type="text" placeholder="Leave blank to analyze all repos" value={repo}
                  onChange={e => setRepo(e.target.value)} style={s.input}
                  onFocus={e => e.target.style.borderColor = "#a855f7"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.2)"} />
              </div>
            </div>
            {error && <p style={s.error}>{error}</p>}
            <button type="submit" style={s.btn}
              onMouseEnter={e => { e.target.style.background = "#a855f7"; e.target.style.borderColor = "#a855f7"; e.target.style.color = "#fff" }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(255,255,255,0.3)"; e.target.style.color = "#fff" }}>
              RUN ANALYSIS →
            </button>
          </form>
          <div style={s.divider} />
          <div style={s.featureGrid}>
            {[
              ["01", "Commit pattern analysis", "We map your commit frequency, timing, and day-of-week trends. See exactly when you code best and worst."],
              ["02", "Behavioral signal detection", "We detect panic commits, vague messages, long dry spells, and burst patterns that reveal how you work under pressure."],
              ["03", "Productivity scoring", "Your commits are graded A–F using a multi-factor model — feature ratio, bug fix rate, message clarity, and streak length."],
              ["04", "Developer archetype", "We classify you into one of six archetypes based on your behavioral signals — from Midnight Firefighter to Steady Builder."],
              ["05", "AI behavioral profile", "A Groq-powered LLM reads your pattern data and writes a personalized psychological profile of how you actually work."],
              ["06", "Hourly activity map", "We visualize your coding activity across all 24 hours, highlighting your peak hour and estimated productivity curve."],
            ].map(([num, title, desc]) => (
              <div key={num} style={s.featureCard}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(168,85,247,0.4)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
              >
                <div style={s.featureNum}>{num}</div>
                <div style={s.featureTitle}>{title}</div>
                <div style={s.featureDesc}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer style={s.footer}>
        <span>Works on any public GitHub profile</span>
        <span style={s.fdiv}>—</span>
        <span>No account required</span>
        <span style={s.fdiv}>—</span>
        <span>Free forever</span>
      </footer>
    </div>
  )
}

const s = {
  root: { minHeight: "100vh", background: "#0f0f0f", color: "#ffffff", fontFamily: "'DM Mono','Courier New',monospace", display: "flex", flexDirection: "column" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 48px", borderBottom: "1px solid rgba(255,255,255,0.08)" },
  logo: { fontSize: "13px", fontWeight: "700", letterSpacing: "0.2em", color: "#a855f7" },
  version: { fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" },
  main: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 48px" },
  center: { width: "100%", maxWidth: "900px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" },
  eyebrow: { fontSize: "11px", letterSpacing: "0.25em", color: "rgba(255,255,255,0.4)", marginBottom: "20px" },
  headline: { fontSize: "clamp(40px,5.5vw,68px)", fontFamily: "'DM Serif Display',Georgia,serif", fontWeight: "400", fontStyle: "normal", lineHeight: "1.08", margin: "0 0 20px 0", color: "#ffffff" },
  accent: { color: "#a855f7", fontStyle: "normal" },
  sub: { fontSize: "15px", lineHeight: "1.8", color: "rgba(255,255,255,0.6)", maxWidth: "560px", margin: "0 0 36px 0" },
  form: { display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "620px", alignItems: "center" },
  inputRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", width: "100%" },
  inputWrap: { display: "flex", flexDirection: "column", gap: "8px", textAlign: "left" },
  label: { fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)" },
  optional: { color: "rgba(255,255,255,0.2)" },
  input: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px", padding: "14px 16px", color: "#ffffff", fontSize: "14px", fontFamily: "inherit", outline: "none", transition: "border-color 0.2s", width: "100%", boxSizing: "border-box" },
  error: { color: "#f87171", fontSize: "12px", letterSpacing: "0.05em" },
  btn: { background: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "#ffffff", padding: "15px 48px", fontSize: "12px", fontFamily: "inherit", letterSpacing: "0.15em", fontWeight: "600", cursor: "pointer", borderRadius: "6px", transition: "all 0.2s", marginTop: "4px" },
  divider: { width: "100%", height: "1px", background: "rgba(255,255,255,0.08)", margin: "52px 0 48px 0" },
  featureGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", width: "100%", textAlign: "left" },
  featureCard: { border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "24px", background: "rgba(255,255,255,0.03)", transition: "border-color 0.2s", cursor: "default" },
  featureNum: { fontSize: "10px", color: "#a855f7", letterSpacing: "0.2em", marginBottom: "12px" },
  featureTitle: { fontSize: "13px", color: "#ffffff", marginBottom: "10px", fontWeight: "600", lineHeight: "1.4" },
  featureDesc: { fontSize: "11px", color: "rgba(255,255,255,0.5)", lineHeight: "1.7" },
  footer: { display: "flex", gap: "16px", padding: "24px 48px", fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", borderTop: "1px solid rgba(255,255,255,0.08)", justifyContent: "center" },
  fdiv: { color: "rgba(255,255,255,0.15)" },
  loadingScreen: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px" },
  loadingUser: { fontSize: "14px", color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em", margin: 0 },
  loadingBarTrack: { width: "320px", height: "2px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden", position: "relative" },
  loadingBarFill: { position: "absolute", top: 0, left: 0, height: "100%", width: "40%", background: "#a855f7", borderRadius: "2px", animation: "slide 1.8s ease-in-out infinite" },
  loadingMsg: { fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", margin: 0 },
}