export default function StatsGrid({ report }) {
  const bugFixRate = report.total_commits > 0
    ? Math.round((report.type_distribution?.bug_fix || 0) / report.total_commits * 100)
    : 0

  const stats = [
    { label: "Total commits", value: report.total_commits },
    { label: "Peak day", value: report.peak_day },
    { label: "Conflict signals", value: report.conflict_signals },
    { label: "Bug fix rate", value: `${bugFixRate}%` },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map(({ label, value }) => (
        <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-zinc-500 text-xs mb-1">{label}</p>
          <p className="text-white font-semibold text-xl">{value}</p>
        </div>
      ))}
    </div>
  )
}
