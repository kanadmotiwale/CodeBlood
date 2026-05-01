export default function StatsGrid({ report }) {
  const bugFixRate = report.total_commits > 0 ? Math.round((report.type_distribution?.bug_fix || 0) / report.total_commits * 100) : 0
  const featureRate = report.total_commits > 0 ? Math.round((report.type_distribution?.feature || 0) / report.total_commits * 100) : 0
  const blocks = [
    { index: "02", label: "COMMIT HEALTH", items: [
      { name: "Bug fix rate", value: `${bugFixRate}%`, warn: bugFixRate > 40 },
      { name: "Feature rate", value: `${featureRate}%`, warn: false },
      { name: "Conflict signals", value: report.conflict_signals, warn: report.conflict_signals > 5 },
    ]},
    { index: "03", label: "WORK PATTERNS", items: [
      { name: "Peak day", value: report.peak_day },
      { name: "Total commits", value: report.total_commits },
      { name: "Panic commits", value: report.panic_commits, warn: report.panic_commits > 3 },
    ]},
  ]
  return (
    <div style={s.wrap}>
      {blocks.map(block => (
        <div key={block.index} style={s.block}>
          <div style={s.topLine}>
            <span style={s.label}>{block.label}</span>
            <span style={s.index}>{block.index}</span>
          </div>
          <div style={s.items}>
            {block.items.map((item, i) => (
              <div key={item.name} style={{ ...s.item, ...(i === block.items.length - 1 ? { borderBottom: "none", paddingBottom: 0 } : {}) }}>
                <span style={s.itemName}>{item.name}</span>
                <span style={{ ...s.itemValue, ...(item.warn ? s.warn : {}) }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const s = {
  wrap: { display: "flex", flexDirection: "column", gap: "20px" },
  block: { border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "24px", background: "rgba(255,255,255,0.02)" },
  topLine: { display: "flex", justifyContent: "space-between", marginBottom: "16px" },
  label: { fontSize: "10px", letterSpacing: "0.25em", color: "rgba(168,85,247,0.8)" },
  index: { fontSize: "11px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" },
  items: { display: "flex", flexDirection: "column" },
  item: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" },
  itemName: { fontSize: "12px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.03em" },
  itemValue: { fontSize: "14px", fontWeight: "600", color: "#ffffff" },
  warn: { color: "#f87171" },
}