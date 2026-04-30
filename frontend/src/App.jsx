import { useState } from "react"
import LandingPage from "./pages/LandingPage"
import Dashboard from "./pages/Dashboard"

export default function App() {
  const [report, setReport] = useState(null)

  return report
    ? <Dashboard report={report} onReset={() => setReport(null)} />
    : <LandingPage onAnalyze={setReport} />
}
