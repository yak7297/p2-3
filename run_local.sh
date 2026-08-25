#!/bin/sh
set -eu

PROJECT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
VENV_DIR="$PROJECT_DIR/.venv"

cd "$PROJECT_DIR"

if ! command -v python3 >/dev/null 2>&1; then
  echo "Python 3가 필요합니다. Python을 설치한 뒤 다시 실행하세요."
  exit 1
fi

if [ ! -x "$VENV_DIR/bin/python" ]; then
  echo "처음 실행 준비 중입니다..."
  python3 -m venv "$VENV_DIR"
fi

if ! "$VENV_DIR/bin/python" -c "from google import genai" >/dev/null 2>&1; then
  echo "Gemini 패키지를 설치 중입니다..."
  "$VENV_DIR/bin/pip" install -r requirements.txt
fi

exec "$VENV_DIR/bin/python" dev.py
