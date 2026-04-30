# CodeBlood

> Decode developer behavior through Git history. Spotify Wrapped for your engineering psychology.

## Quick Start

### Backend
```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # add your keys
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## Architecture
- **Frontend**: React + TailwindCSS + Recharts
- **Backend**: FastAPI (Python)
- **AI**: Groq API (Llama 3 — free tier)
- **GitHub Data**: GitHub REST API v3

## Features (Phase 1)
- [x] GitHub commit fetching (public repos, no token needed)
- [x] Feature extraction (time, vagueness, commit type, panic detection)
- [x] Pattern analysis (streaks, archetypes, conflict signals)
- [x] LLM narrative generation via Groq
- [x] Wrapped card + stats dashboard

## Roadmap
- [ ] Phase 2: PR conflict analysis, file hotspot detection, visual heatmaps
- [ ] Phase 3: Shareable PNG card export, team mode, benchmarking
