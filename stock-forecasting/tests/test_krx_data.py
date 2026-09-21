import pytest

from stock_forecasting.krx_data import (
    krx_credentials_present,
    require_krx_credentials,
)


def test_require_krx_credentials_fails_cleanly_without_env(monkeypatch):
    monkeypatch.delenv("KRX_ID", raising=False)
    monkeypatch.delenv("KRX_PW", raising=False)

    assert not krx_credentials_present()
    with pytest.raises(RuntimeError) as exc:
        require_krx_credentials()

    message = str(exc.value)
    assert "KRX_ID" in message
    assert "KRX_PW" in message
    assert "PowerShell" in message


def test_require_krx_credentials_passes_with_env(monkeypatch):
    monkeypatch.setenv("KRX_ID", "dummy-id")
    monkeypatch.setenv("KRX_PW", "dummy-pw")

    assert krx_credentials_present()
    require_krx_credentials()
