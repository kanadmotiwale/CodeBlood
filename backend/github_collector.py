import httpx
from typing import Optional, List

GITHUB_API = "https://api.github.com"

async def fetch_commits(username: str, repo: Optional[str], token: Optional[str]) -> List[dict]:
    headers = {"Accept": "application/vnd.github+json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"

    async with httpx.AsyncClient(headers=headers) as client:
        if repo:
            return await _fetch_repo_commits(client, username, repo)
        else:
            return await _fetch_all_commits(client, username)

async def _fetch_repo_commits(client, username: str, repo: str) -> List[dict]:
    resp = await client.get(
        f"{GITHUB_API}/repos/{username}/{repo}/commits",
        params={"per_page": 100}
    )
    resp.raise_for_status()
    return resp.json()

async def _fetch_all_commits(client, username: str) -> List[dict]:
    repos_resp = await client.get(
        f"{GITHUB_API}/users/{username}/repos",
        params={"per_page": 5, "sort": "pushed"}
    )
    repos_resp.raise_for_status()
    repos = repos_resp.json()

    all_commits = []
    for repo in repos:
        commits_resp = await client.get(
            f"{GITHUB_API}/repos/{username}/{repo['name']}/commits",
            params={"author": username, "per_page": 100}
        )
        if commits_resp.status_code == 200:
            all_commits.extend(commits_resp.json())
    return all_commits
