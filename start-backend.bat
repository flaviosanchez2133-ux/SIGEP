@echo off
echo ========================================
echo    SIGEP - Iniciando Backend
echo ========================================
echo.

cd /d "%~dp0backend"

echo [1/4] Verificando PostgreSQL...
psql -U postgres -c "SELECT 1" >nul 2>&1
if errorlevel 1 (
    echo ERROR: PostgreSQL no esta corriendo
    echo Inicia PostgreSQL y vuelve a intentar
    pause
    exit /b 1
)
echo OK: PostgreSQL corriendo

echo.
echo [2/4] Verificando Redis...
redis-cli ping >nul 2>&1
if errorlevel 1 (
    echo ADVERTENCIA: Redis no disponible, algunas funciones pueden no funcionar
) else (
    echo OK: Redis corriendo
)

echo.
echo [3/4] Verificando base de datos...
psql -U sigep_user -d sigep_db -c "SELECT 1" >nul 2>&1
if errorlevel 1 (
    echo Creando base de datos y usuario...
    psql -U postgres -c "CREATE DATABASE sigep_db;" 2>nul
    psql -U postgres -c "CREATE USER sigep_user WITH PASSWORD 'sigep_password_2024';" 2>nul
    psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE sigep_db TO sigep_user;" 2>nul
    psql -U postgres -d sigep_db -c "GRANT ALL ON SCHEMA public TO sigep_user;" 2>nul
)
echo OK: Base de datos lista

echo.
echo [4/4] Iniciando servidor backend...
echo.
echo ========================================
echo    Backend: http://localhost:3001
echo    API:     http://localhost:3001/api
echo ========================================
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

npx tsx src/index.ts
