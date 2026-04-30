import sys
sys.path.insert(0, "../backend")

from feature_extractor import extract_features, _score_vagueness, _classify_type

SAMPLE_COMMITS = [
    {
        "sha": "abc123def456",
        "commit": {
            "message": "fix auth bug",
            "author": {"date": "2024-03-10T23:47:00Z"}
        }
    },
    {
        "sha": "def456ghi789",
        "commit": {
            "message": "add user registration flow with email verification",
            "author": {"date": "2024-03-11T14:20:00Z"}
        }
    },
    {
        "sha": "ghi789jkl012",
        "commit": {
            "message": "refactor token service to use dependency injection",
            "author": {"date": "2024-03-12T10:05:00Z"}
        }
    },
]

def test_vagueness_scorer():
    assert _score_vagueness("fix") > 0.7, "Single vague word should score high"
    assert _score_vagueness("implement oauth2 token refresh with 15min expiry") < 0.3, "Descriptive message should score low"
    assert _score_vagueness("") == 1.0, "Empty message is maximally vague"
    print("  vagueness scorer: OK")

def test_type_classifier():
    assert _classify_type("fix auth bug") == "bug_fix"
    assert _classify_type("add user registration") == "feature"
    assert _classify_type("refactor token service") == "refactor"
    assert _classify_type("update readme docs") == "docs"
    assert _classify_type("bump dependencies") == "chore"
    print("  type classifier: OK")

def test_extract_features():
    features = extract_features(SAMPLE_COMMITS)
    assert len(features) == 3
    assert features[0]["commit_type"] == "bug_fix"
    assert features[0]["is_panic_commit"] == True   # 23:47 + vague = panic
    assert features[1]["is_panic_commit"] == False  # 14:20 = normal
    assert features[2]["commit_type"] == "refactor"
    print("  extract features: OK")

if __name__ == "__main__":
    print("Running tests...")
    test_vagueness_scorer()
    test_type_classifier()
    test_extract_features()
    print("All tests passed.")
