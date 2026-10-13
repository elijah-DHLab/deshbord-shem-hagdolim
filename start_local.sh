#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")"
echo "Shem HaGdolim — local/offline at http://127.0.0.1:8765/"
python3 -m http.server 8765 --bind 127.0.0.1
