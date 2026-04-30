import { useState } from "react"

const API_BASE = "http://localhost:8000"

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
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-purple-400">CodeBlood</h1>
          <p className="mt-3 text-zinc-400 text-lg">Your Git history. Your psychology.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="GitHub username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
          />
          <input
            type="text"
            placeholder="Repo name (optional — analyzes all if blank)"
            value={repo}
            onChange={e => setRepo(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Analyzing..." : "Analyze My Code DNA →"}
          </button>
        </form>

        <p className="text-center text-zinc-600 text-xs">
          Works on public repos with no token. Add one in the API for private repos.
        </p>
      </div>
    </div>
  )
}
