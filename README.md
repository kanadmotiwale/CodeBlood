# CodeBlood

CodeBlood analyzes your GitHub commit history and builds a behavioral profile of how you actually work — not how you think you work.

Most developers treat their Git history as a log of what they did. CodeBlood treats it as a window into how they think.

Live: [code-blood.vercel.app](https://code-blood.vercel.app)

---

## What it does

**Commit pattern analysis**
Maps your commit frequency, timing, and day-of-week trends. Tells you exactly when you code best and worst.

**Behavioral signal detection**
Detects panic commits, vague messages, long dry spells, and burst patterns. Each signal adds to your behavioral fingerprint.

**Productivity scoring**
Grades your commits A–F using a multi-factor model — feature ratio, bug fix rate, message clarity, streak length, and conflict signals.

**Developer archetype**
Classifies you into one of six archetypes based on behavioral signals — from Midnight Firefighter to Steady Builder.

**AI behavioral profile**
A Groq-powered LLM reads your pattern data and writes a personalized psychological profile of how you actually work.

**Hourly activity map**
Visualizes your coding activity across all 24 hours, with your peak hour highlighted.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + inline styles |
| Backend | FastAPI (Python) |
| GitHub data | GitHub REST API v3 |
| AI narrative | Groq API (Llama 3.3) |
| Frontend hosting | Vercel |
| Backend hosting | Render |

---

## Running locally

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` folder: