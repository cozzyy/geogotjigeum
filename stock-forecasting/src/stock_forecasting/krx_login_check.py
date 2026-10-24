from __future__ import annotations

import json

from .krx_data import diagnose_krx_login


def main():
    result = diagnose_krx_login()

    print("=== KRX 로그인 진단 ===")
    print(f"HTTP status: {result.get('http_status', '-')}")
    print(f"Content-Type: {result.get('content_type', '-')}")
    print(f"ID length: {result.get('login_id_length', '-')}")
    print(f"PW length: {result.get('password_length', '-')}")
    print(f"KRX code: {result.get('error_code', '-')}")
    print(f"KRX message: {result.get('error_message', '-')}")
    print(f"로그인 성공: {'YES' if result.get('ok') else 'NO'}")

    if result.get("duplicate_login_retry"):
        print("중복 로그인(CD011) 감지 후 skipDup=Y 재시도함.")

    code = result.get("error_code")
    if code == "CD005":
        print(
            "조치: 입력한 값이 KRX Data Marketplace 로그인 ID로 등록되어 있지 않습니다. "
            "이메일 주소와 로그인 ID는 별개일 수 있으므로 '아이디 찾기'에서 실제 ID를 확인하세요."
        )
    elif code == "CD010":
        print("조치: KRX Data Marketplace에서 비밀번호를 변경한 뒤 다시 시도.")
    elif code == "NON_JSON":
        print("조치: KRX 로그인 엔드포인트/WAF/네트워크 문제 가능성 점검.")
    elif not result.get("ok"):
        print(
            "조치: 먼저 브라우저에서 KRX Data Marketplace에 "
            "동일 ID/PW로 직접 로그인되는지 확인."
        )


if __name__ == "__main__":
    main()
