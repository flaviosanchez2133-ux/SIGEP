@echo off
echo ========================================
echo    SIGEP - Inicio Completo
echo ========================================
echo.
echo Este script iniciara:
echo   1. Backend (puerto 3001)
echo   2. Frontend (puerto 5173)
echo.
echo Se abriran dos ventanas de terminal.
echo.

start "SIGEP Backend" cmd /k "cd /d %~dp0 && start-backend.bat"
timeout /t 3 /nobreak >nul
start "SIGEP Frontend" cmd /k "cd /d %~dp0 && start-frontend.bat"

echo.
echo ========================================
echo Servidores iniciados!
echo.
echo   Backend:  http://localhost:3001
echo   Frontend: http://localhost:5173
echo.
echo   Login: superadmin / SIGEP_2024
echo ========================================
echo.
pause
