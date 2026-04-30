const COLORS = {
  bug_fix: "#f87171",
  feature: "#a78bfa",
  refactor: "#34d399",
  docs: "#60a5fa",
  chore: "#9ca3af",
}

export default function CommitTypeChart({ distribution }) {
  const total = Object.values(distribution).reduce((a, b) => a + b, 0)
  if (!total) return null

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
      <h2 className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Commit Breakdown</h2>
      {Object.entries(distribution)
        .sort(([, a], [, b]) => b - a)
        .map(([type, count]) => (
          <div key={type} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-300 capitalize">{type.replace("_", " ")}</span>
              <span className="text-zinc-500">{count} ({Math.round(count / total * 100)}%)</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${count / total * 100}%`, background: COLORS[type] || "#9ca3af" }}
              />
            </div>
          </div>
        ))}
    </div>
  )
}
