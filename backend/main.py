from dotenv import load_dotenv
from pathlib import Path
load_dotenv(Path(__file__).parent / ".env")
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="CodeBlood API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalysisRequest(BaseModel):
    github_username: str
    repo_name: Optional[str] = None
    github_token: Optional[str] = None

@app.get("/")
def root():
    return {"status": "CodeBlood API running"}

@app.post("/analyze")
async def analyze(req: AnalysisRequest):
    from github_collector import fetch_commits
    from feature_extractor import extract_features
    from pattern_analyzer import analyze_patterns
    from llm_reporter import generate_report

    commits = await fetch_commits(req.github_username, req.repo_name, req.github_token)
    features = extract_features(commits)
    patterns = analyze_patterns(features)
    report = await generate_report(patterns)
    return report
