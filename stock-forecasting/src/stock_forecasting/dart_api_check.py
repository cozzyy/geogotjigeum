from __future__ import annotations

from .config import CROSS_SECTION_UNIVERSE
from .dart_data import DARTProvider, diagnose_dart_api


def main():
    result = diagnose_dart_api()

    print("=== OpenDART API 진단 ===")
    print(f"API key length: {result.get('key_length', '-')}")
    print(f"진단 성공: {'YES' if result.get('ok') else 'NO'}")
    print(f"메시지: {result.get('message', '-')}")

    if not result.get("ok"):
        return

    provider = DARTProvider()
    mapping = provider.stock_to_corp_code(list(CROSS_SECTION_UNIVERSE))
    print(
        f"V11 universe corp-code mapping: "
        f"{len(mapping)}/{len(CROSS_SECTION_UNIVERSE)}"
    )

    missing = [
        ticker for ticker in CROSS_SECTION_UNIVERSE
        if ticker not in mapping
    ]
    if missing:
        print("매핑 실패 종목: " + ", ".join(missing))
    else:
        print("30종목 DART corp-code 매핑 정상.")


if __name__ == "__main__":
    main()
