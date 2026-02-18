#!/bin/bash
# Script untuk menjalankan local server untuk PWA

echo "🚀 Starting Camera App PWA Server..."
echo ""
echo "Pilih server yang ingin digunakan:"
echo "1. Python 3 (http.server)"
echo "2. Node.js (http-server)"
echo "3. PHP"
echo ""
read -p "Pilihan (1-3): " choice

case $choice in
    1)
        echo "Starting Python server on http://localhost:8000"
        python3 -m http.server 8000
        ;;
    2)
        if command -v npx &> /dev/null; then
            echo "Starting Node.js server on http://localhost:8000"
            npx http-server -p 8000
        else
            echo "❌ Node.js tidak terinstall. Install dengan: sudo apt install nodejs npm"
            exit 1
        fi
        ;;
    3)
        if command -v php &> /dev/null; then
            echo "Starting PHP server on http://localhost:8000"
            php -S localhost:8000
        else
            echo "❌ PHP tidak terinstall. Install dengan: sudo apt install php"
            exit 1
        fi
        ;;
    *)
        echo "❌ Pilihan tidak valid"
        exit 1
        ;;
esac
