from collections import Counter
from typing import List
import statistics

def analyze_patterns(features: List[dict]) -> dict:
    if not features:
        return {}

    hours = [f["hour_of_day"] for f in features]
    days = [f["day_of_week"] for f in features]
    types = [f["commit_type"] for f in features]
    vagueness = [f["vagueness_score"] for f in features]

    peak_hour = Counter(hours).most_common(1)[0][0]
    peak_day = Counter(days).most_common(1)[0][0]
    type_counts = Counter(types)
    panic_count = sum(1 for f in features if f["is_panic_commit"])
    conflict_count = sum(1 for f in features if f["has_conflict_signal"])

    avg_vagueness = statistics.mean(vagueness)
    vague_pct = round(avg_vagueness * 100)

    streak = _longest_streak(features)
    archetype = _assign_archetype(peak_hour, panic_count, len(features), type_counts, avg_vagueness)

    return {
        "total_commits": len(features),
        "peak_hour": peak_hour,
        "peak_day": peak_day,
        "type_distribution": dict(type_counts),
        "panic_commits": panic_count,
        "conflict_signals": conflict_count,
        "vague_commit_pct": vague_pct,
        "longest_streak_days": streak,
        "archetype": archetype,
    }

def _longest_streak(features: List[dict]) -> int:
    dates = sorted(set(f["timestamp"][:10] for f in features))
    if not dates:
        return 0
    streak = max_streak = 1
    from datetime import date
    for i in range(1, len(dates)):
        d1 = date.fromisoformat(dates[i - 1])
        d2 = date.fromisoformat(dates[i])
        if (d2 - d1).days == 1:
            streak += 1
            max_streak = max(max_streak, streak)
        else:
            streak = 1
    return max_streak

def _assign_archetype(peak_hour, panic_count, total, type_counts, avg_vagueness) -> dict:
    bug_ratio = type_counts.get("bug_fix", 0) / max(total, 1)
    refactor_ratio = type_counts.get("refactor", 0) / max(total, 1)

    if peak_hour >= 22 or peak_hour <= 3:
        return {"name": "The Midnight Firefighter", "emoji": "🦉", "description": "You do your best (or most desperate) work after dark."}
    if refactor_ratio > 0.3:
        return {"name": "The Perfectionist Refactorer", "emoji": "🧹", "description": "You can't ship without cleaning first."}
    if bug_ratio > 0.4:
        return {"name": "The Bug Magnet", "emoji": "🧯", "description": "High fix-to-feature ratio — you ship fast and patch faster."}
    if panic_count / max(total, 1) > 0.25:
        return {"name": "The Sprinter", "emoji": "⚡", "description": "Burst commits, long silences, burst again."}
    return {"name": "The Steady Builder", "emoji": "🏗️", "description": "Consistent, deliberate, methodical."}
