from typing import List
from datetime import datetime

def analyze_conflicts(pull_requests: List[dict]) -> dict:
    """
    Infer merge conflict behavior from PR metadata.
    GitHub doesn't expose raw conflict data — we use proxy signals.

    Signals:
      1. mergeable_state == "dirty"       → active conflict
      2. Long-lived branches (>7 days)    → high conflict risk
      3. Multiple merge commits in one PR → iterative resolution
    """
    if not pull_requests:
        return {"conflict_rate": 0, "personality": "Unknown", "total_prs": 0}

    dirty_prs = [pr for pr in pull_requests if pr.get("mergeable_state") == "dirty"]
    long_lived = [pr for pr in pull_requests if _branch_age_days(pr) > 7]

    conflict_rate = len(dirty_prs) / max(len(pull_requests), 1)
    avg_resolution = _avg_resolution_time(dirty_prs)
    personality = _conflict_personality(conflict_rate, avg_resolution)

    return {
        "total_prs": len(pull_requests),
        "conflicted_prs": len(dirty_prs),
        "long_lived_branches": len(long_lived),
        "conflict_rate": round(conflict_rate, 2),
        "avg_resolution_hours": avg_resolution,
        "personality": personality,
    }

def _branch_age_days(pr: dict) -> int:
    created = pr.get("created_at", "")
    merged = pr.get("merged_at") or pr.get("closed_at", "")
    if not created or not merged:
        return 0
    try:
        d1 = datetime.fromisoformat(created.replace("Z", "+00:00"))
        d2 = datetime.fromisoformat(merged.replace("Z", "+00:00"))
        return (d2 - d1).days
    except Exception:
        return 0

def _avg_resolution_time(dirty_prs: List[dict]) -> float:
    times = [_branch_age_days(pr) * 24 for pr in dirty_prs if _branch_age_days(pr) > 0]
    return round(sum(times) / len(times), 1) if times else 0.0

def _conflict_personality(rate: float, avg_hours: float) -> str:
    if rate < 0.1:
        return "Clean Merger"
    if avg_hours < 4:
        return "Fast Resolver"
    if avg_hours > 48:
        return "Avoider"
    return "Frequent Causer"
