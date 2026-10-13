@echo off
setlocal
cd /d "%~dp0"
echo.
echo Shem HaGdolim - Offline Research Atlas
echo Open: http://127.0.0.1:8765/
echo This local server does NOT require an Internet connection.
echo Press Ctrl+C to stop.
echo.
where py >nul 2>nul
if %errorlevel%==0 (
  start "" "http://127.0.0.1:8765/"
  py -3 -m http.server 8765 --bind 127.0.0.1
  goto :end
)
where python >nul 2>nul
if %errorlevel%==0 (
  start "" "http://127.0.0.1:8765/"
  python -m http.server 8765 --bind 127.0.0.1
  goto :end
)
echo Python 3 is required to run the local server.
echo Install Python 3, then run START_LOCAL.bat again.
pause
:end
