import httpx
import os

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")

async def generate_report(patterns: dict) -> dict:
    if not GROQ_API_KEY:
        return {**patterns, "narrative": _fallback_narrative(patterns)}

    prompt = f"""
You are CodeBlood, a developer psychology profiler. Based on these Git behavior patterns, write a sharp, witty 3-sentence psychological profile of this developer. Be insightful, a little roasting, but ultimately constructive.

Data: {patterns}
"""
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            GROQ_API_URL,
            headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
            json={
                "model": "llama3-8b-8192",
                "messages": [{"role": "user", "content": prompt}],
                "max_tokens": 200
            },
            timeout=15.0
        )
        if resp.status_code == 200:
            narrative = resp.json()["choices"][0]["message"]["content"]
        else:
            narrative = _fallback_narrative(patterns)

    return {**patterns, "narrative": narrative}

def _fallback_narrative(patterns: dict) -> str:
    archetype = patterns.get("archetype", {}).get("name", "Unknown")
    total = patterns.get("total_commits", 0)
    hour = patterns.get("peak_hour", "?")
    return (
        f"Analysis complete: {total} commits scanned. "
        f"Peak coding time is {hour}:00. "
        f"Archetype assigned: {archetype}. Add a GROQ_API_KEY to unlock a full narrative profile."
    )
