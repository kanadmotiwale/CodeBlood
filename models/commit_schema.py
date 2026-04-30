from pydantic import BaseModel
from typing import Optional, Dict

class CommitFeature(BaseModel):
    sha: str
    message: str
    timestamp: str
    day_of_week: str
    hour_of_day: int
    is_weekend: bool
    message_word_count: int
    vagueness_score: float
    commit_type: str
    is_panic_commit: bool
    has_conflict_signal: bool

class ArchetypeResult(BaseModel):
    name: str
    emoji: str
    description: str

class AnalysisReport(BaseModel):
    total_commits: int
    peak_hour: int
    peak_day: str
    type_distribution: Dict[str, int]
    panic_commits: int
    conflict_signals: int
    vague_commit_pct: int
    longest_streak_days: int
    archetype: ArchetypeResult
    narrative: Optional[str] = None
