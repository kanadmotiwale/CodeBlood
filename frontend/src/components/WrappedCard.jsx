export default function WrappedCard({ report }) {
  const { archetype, peak_hour, vague_commit_pct, panic_commits, longest_streak_days } = report
  const formatHour = h => `${h % 12 || 12}${h < 12 ? "am" : "pm"}`

  return (
    <div className="bg-gradient-to-br from-purple-950 to-zinc-900 border border-purple-800/50 rounded-2xl p-8 text-center space-y-4">
      <p className="text-purple-400 text-sm font-medium uppercase tracking-widest">Your Dev Personality</p>
      <div className="text-6xl">{archetype?.emoji}</div>
      <h2 className="text-3xl font-bold">{archetype?.name}</h2>
      <p className="text-zinc-400 max-w-xs mx-auto text-sm">{archetype?.description}</p>

      <div className="grid grid-cols-2 gap-3 pt-4 text-left max-w-xs mx-auto">
        {[
          ["Peak hour", formatHour(peak_hour)],
          ["Vague commits", `${vague_commit_pct}%`],
          ["Panic commits", panic_commits],
          ["Longest streak", `${longest_streak_days}d`],
        ].map(([label, value]) => (
          <div key={label} className="bg-black/30 rounded-lg p-3">
            <p className="text-zinc-500 text-xs">{label}</p>
            <p className="text-white font-semibold text-lg">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
