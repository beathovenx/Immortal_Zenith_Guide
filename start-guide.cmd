@echo off
setlocal

cd /d "%~dp0"

if not exist "package.json" (
  echo [ERROR] package.json not found. Run this from the guide folder.
  pause
  exit /b 1
)

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm was not found. Please install Node.js first.
  pause
  exit /b 1
)

set "PORT=4173"
if not "%~1"=="" set "PORT=%~1"

echo Starting Immortal Zenith guide on http://127.0.0.1:%PORT%
start "" "http://127.0.0.1:%PORT%"

set "PORT=%PORT%"
call npm.cmd start

endlocal
