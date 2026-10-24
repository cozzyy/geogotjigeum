import json
from pathlib import Path

import numpy as np
import pandas as pd
import pytest

from stock_forecasting.v14_live_shadow import (
    FROZEN_MODEL_VERSION,
    PROMOTION_POLICY,
    append_snapshot,
    ensure_frozen_manifest,
    load_shadow_log,
    settle_shadow_log,
    shadow_status,
)


def _snapshot(date="2026-09-21"):
    return pd.DataFrame({
        "as_of_date": pd.to_datetime([date, date]),
        "ticker": ["000001", "000002"],
        "name": ["A", "B"],
        "broad_sector": ["x", "x"],
        "base_score_raw": [0.1, 0.2],
        "dart_score_raw": [0.2, 0.1],
        "base_rank_score": [0.5, 1.0],
        "dart_rank_score": [1.0, 0.5],
        "dart_gate_active": [True, False],
        "active_dart_categories": ["earnings", ""],
        "final_score": [0.75, 1.0],
        "final_rank": [0.5, 1.0],
        "model_version": [FROZEN_MODEL_VERSION] * 2,
        "horizon": [5, 5],
        "train_start_date": pd.to_datetime(
            ["2023-09-21", "2023-09-21"]
        ),
        "train_label_cutoff": pd.to_datetime(
            ["2026-09-14", "2026-09-14"]
        ),
        "created_at_utc": pd.to_datetime(
            ["2026-09-21", "2026-09-21"]
        ),
        "status": ["pending", "pending"],
        "realized_date": [pd.NaT, pd.NaT],
        "settled_at_utc": [pd.NaT, pd.NaT],
        "future_ret_5d": [np.nan, np.nan],
        "future_sector_neutral_5d": [np.nan, np.nan],
        "target_sector_neutral_rank_5d": [np.nan, np.nan],
    })


def test_manifest_is_immutable(tmp_path):
    root = tmp_path / "shadow"
    path = ensure_frozen_manifest(root)
    data = json.loads(path.read_text(encoding="utf-8"))
    data["horizon_trading_days"] = 20
    path.write_text(
        json.dumps(data, ensure_ascii=False),
        encoding="utf-8",
    )
    with pytest.raises(RuntimeError):
        ensure_frozen_manifest(root)


def test_append_snapshot_is_idempotent(tmp_path):
    root = tmp_path / "shadow"
    snap = _snapshot()
    log, added = append_snapshot(root, pd.DataFrame(), snap)
    assert added
    assert len(log) == 2

    loaded = load_shadow_log(root)
    log2, added2 = append_snapshot(root, loaded, snap)
    assert not added2
    assert len(log2) == 2


def test_settle_shadow_log_from_future_target():
    log = _snapshot()
    panel_dates = pd.bdate_range(
        "2026-09-21", periods=6
    )
    rows = []
    for d in panel_dates:
        for ticker, value in [
            ("000001", 0.8),
            ("000002", 0.2),
        ]:
            rows.append({
                "date": d,
                "ticker": ticker,
                "future_ret_5d": (
                    0.05 if d == panel_dates[0] else np.nan
                ),
                "future_sector_neutral_5d": (
                    0.03 if d == panel_dates[0] else np.nan
                ),
                "target_sector_neutral_rank_5d": (
                    value if d == panel_dates[0] else np.nan
                ),
            })
    panel = pd.DataFrame(rows)

    settled, n = settle_shadow_log(log, panel)
    assert n == 2
    assert set(settled["status"]) == {"settled"}
    assert settled["realized_date"].notna().all()


def test_shadow_status_collecting_before_minimum_history():
    # Two settled days are intentionally far below the frozen 126-day gate.
    rows = []
    for i, dt in enumerate(pd.bdate_range("2026-09-01", periods=2)):
        for j in range(30):
            rank = (j + 1) / 30
            rows.append({
                "as_of_date": dt,
                "ticker": f"{j:06d}",
                "name": str(j),
                "broad_sector": "x",
                "base_rank_score": rank,
                "final_score": rank,
                "status": "settled",
                "future_ret_5d": rank / 100,
                "future_sector_neutral_5d": rank / 100,
                "target_sector_neutral_rank_5d": rank,
            })
    log = pd.DataFrame(rows)
    status, _, _ = shadow_status(log, bootstrap_reps=10)
    assert status["decision"] == "COLLECTING"
    assert status["realized_days"] == 2
    assert PROMOTION_POLICY.min_realized_days == 126
