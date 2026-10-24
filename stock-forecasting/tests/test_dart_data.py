import pytest

from stock_forecasting.dart_data import require_dart_api_key


def test_require_dart_api_key_missing(monkeypatch):
    monkeypatch.delenv("DART_API_KEY", raising=False)
    with pytest.raises(RuntimeError):
        require_dart_api_key()


def test_require_dart_api_key_rejects_placeholder(monkeypatch):
    monkeypatch.setenv("DART_API_KEY", "본인의_DART_API_KEY")
    with pytest.raises(RuntimeError):
        require_dart_api_key()


def test_require_dart_api_key_accepts_40_chars(monkeypatch):
    key = "a" * 40
    monkeypatch.setenv("DART_API_KEY", key)
    assert require_dart_api_key() == key
