#!/bin/bash
cd "$(dirname "$0")" || exit 1
echo "📁 Ordner: $(pwd)"
echo "🚀 Starte lokalen Webserver auf Port 8000..."
python3 -m http.server 8000 &
sleep 2
echo "🌐 Öffne Browser..."
open "http://localhost:8000/index.html"
