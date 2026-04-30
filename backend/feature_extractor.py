from datetime import datetime
from typing import List

VAGUE_KEYWORDS = ["fix", "update", "change", "misc", "stuff", "wip", "temp", "test", "minor", "patch"]
BUG_KEYWORDS = ["fix", "bug", "error", "crash", "broken", "revert", "hotfix", "issue"]
CONFLICT_KEYWORDS = ["resolve conflict", "fix merge", "merge branch", "rebase", "manual merge", "accept incoming"]
PANIC_HOUR_START = 22
PANIC_HOUR_END = 4

def extract_features(raw_commits: List[dict]) -> List[dict]:
    features = []
    for c in raw_commits:
        commit_data = c.get("commit", {})
        message = commit_data.get("message", "").strip().lower()
        date_str = commit_data.get("author", {}).get("date", "")

        try:
            dt = datetime.fromisoformat(date_str.replace("Z", "+00:00"))
        except Exception:
            continue

        hour = dt.hour
        is_panic = (hour >= PANIC_HOUR_START or hour <= PANIC_HOUR_END) and _score_vagueness(message) > 0.5

        features.append({
            "sha": c.get("sha", "")[:7],
            "message": message,
            "timestamp": date_str,
            "day_of_week": dt.strftime("%A"),
            "hour_of_day": hour,
            "is_weekend": dt.weekday() >= 5,
            "message_word_count": len(message.split()),
            "vagueness_score": _score_vagueness(message),
            "commit_type": _classify_type(message),
            "is_panic_commit": is_panic,
            "has_conflict_signal": any(kw in message for kw in CONFLICT_KEYWORDS),
        })
    return features

def _score_vagueness(message: str) -> float:
    words = message.split()
    if not words:
        return 1.0
    vague_hits = sum(1 for w in words if w in VAGUE_KEYWORDS)
    length_penalty = max(0, (5 - len(words)) / 5)  # short = vaguer
    return min(1.0, (vague_hits / max(len(words), 1)) + length_penalty * 0.5)

def _classify_type(message: str) -> str:
    if any(k in message for k in BUG_KEYWORDS):
        return "bug_fix"
    if any(k in message for k in ["feat", "add", "implement", "create", "new"]):
        return "feature"
    if any(k in message for k in ["refactor", "clean", "rename", "restructure", "reorganize"]):
        return "refactor"
    if any(k in message for k in ["doc", "readme", "comment", "changelog"]):
        return "docs"
    return "chore"
