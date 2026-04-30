import WrappedCard from "../components/WrappedCard"
import StatsGrid from "../components/StatsGrid"
import CommitTypeChart from "../components/CommitTypeChart"

export default function Dashboard({ report, onReset }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-purple-400">CodeBlood</h1>
          <button onClick={onReset} className="text-zinc-500 hover:text-white text-sm transition">
            ← Analyze another
          </button>
        </div>

        <WrappedCard report={report} />
        <StatsGrid report={report} />
        <CommitTypeChart distribution={report.type_distribution} />

        {report.narrative && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-zinc-400 text-sm font-medium mb-3 uppercase tracking-wider">AI Profile</h2>
            <p className="text-zinc-200 leading-relaxed">{report.narrative}</p>
          </div>
        )}
      </div>
    </div>
  )
}
