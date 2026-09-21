from __future__ import annotations

from .dart_data import diagnose_dart_key


def main():
    result = diagnose_dart_key()
    print("=== OpenDART API Key 진단 ===")
    print(f"Key length: {result.get('key_length', '-')}")
    print(f"법인코드 수: {result.get('corp_count', '-')}")
    print(f"삼성전자(005930) 매핑: {result.get('samsung_found', '-')}")
    print(f"상태: {result.get('status', '-')}")
    print(f"메시지: {result.get('message', '-')}")
    print(f"인증 성공: {'YES' if result.get('ok') else 'NO'}")


if __name__ == "__main__":
    main()
