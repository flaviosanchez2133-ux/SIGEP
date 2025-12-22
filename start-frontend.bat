@echo off
echo ========================================
echo    SIGEP - Iniciando Frontend
echo ========================================
echo.

cd /d "%~dp0"

echo Iniciando servidor de desarrollo...
echo.
echo ========================================
echo    Frontend: http://localhost:5173
echo ========================================
echo.
echo Presiona Ctrl+C para detener
echo.

npm run dev
