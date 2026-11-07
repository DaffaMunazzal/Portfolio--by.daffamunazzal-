@echo off
title Portfolio Dev Server
echo ========================================================
echo   Setting up Node.js PATH and starting Vite server...
echo ========================================================
set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0"
npm run dev
if %ERRORLEVEL% NEQ 0 (
  echo.
  echo Server stopped or encountered an error.
  pause
)

