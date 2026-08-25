"""다듬이 로컬 개발 서버: 정적 화면과 Python API를 함께 실행합니다."""

import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from api.rewrite import handler as ApiHandler


HOST = "127.0.0.1"
PORT = 4173


def load_local_env() -> None:
    env_path = Path(__file__).with_name(".env.local")
    if not env_path.exists():
        return

    for raw_line in env_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


class DevHandler(ApiHandler, SimpleHTTPRequestHandler):
    def do_GET(self) -> None:
        if self.path.startswith("/api/"):
            return ApiHandler.do_GET(self)
        return SimpleHTTPRequestHandler.do_GET(self)


if __name__ == "__main__":
    load_local_env()

    if not os.environ.get("GEMINI_API_KEY"):
        raise SystemExit(
            ".env.local의 GEMINI_API_KEY가 비어 있습니다. 키를 입력하고 다시 실행하세요."
        )

    try:
        server = ThreadingHTTPServer((HOST, PORT), DevHandler)
    except OSError as error:
        raise SystemExit(
            f"{PORT}번 포트를 이미 사용 중입니다. 실행 중인 다듬이 터미널을 먼저 종료하세요."
        ) from error

    print("\n다듬이 실행 완료")
    print(f"브라우저 주소: http://{HOST}:{PORT}/")
    print("종료하려면 Control + C를 누르세요.\n")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n다듬이 서버를 종료합니다.")
    finally:
        server.server_close()
