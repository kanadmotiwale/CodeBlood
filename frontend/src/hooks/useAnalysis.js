import { useState, useCallback } from "react"

const API_BASE = "http://localhost:8000"

export function useAnalysis() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [report, setReport] = useState(null)

  const analyze = useCallback(async ({ username, repo, token }) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          github_username: username,
          repo_name: repo || null,
          github_token: token || null
        })
      })
      if (!res.ok) throw new Error("Analysis failed")
      setReport(await res.json())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  return { loading, error, report, analyze }
}
