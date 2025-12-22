# SIGEP — Manual de arranque (paso a paso)

Este documento sirve para **iniciar SIGEP (frontend + backend + base de datos)** y conocer **los usuarios/credenciales** que vienen pre-cargados para desarrollo.

> Nota: SIGEP tiene dos partes:
>
> - **Frontend (Vite + React)**: corre en `http://localhost:5173`
> - **Backend (Express + Prisma + Socket.IO)**: corre en `http://localhost:3000` o `http://localhost:3001` según tu configuración

---

## 1) Requisitos

### Requisitos mínimos

- **Node.js 18+** (recomendado 20+)
- **npm** (o pnpm/yarn)

### Para Base de Datos (elige 1 opción)

**Opción A (recomendada): Docker Desktop**

- Docker Desktop (incluye Docker Engine)

**Opción B: Instalación local**

- PostgreSQL 15+ (servidor)
- Redis 7+ (servidor)
- Recomendado: `psql` y `redis-cli` en el PATH (para usar scripts `.bat`)

---

## 2) Variables de entorno (importante)

En este repo hay **dos archivos clave**:

- `backend/.env`: lo usa el **backend**.
- `.env.local` (RAÍZ del proyecto): lo usa el **frontend (Vite)**.

> Nota: también existe una `.env` en la raíz del repo, pero **el backend no la lee** con la configuración actual.

### 2.1 Backend: `backend/.env`

Archivo: `backend/.env`

Ejemplo (ya existe en el repo):

- `PORT=3001`
- `DATABASE_URL=postgresql://sigep_user:sigep_password_2024@localhost:5432/sigep_db?schema=public`
- `REDIS_URL=redis://localhost:6379`

### 2.2 Frontend: `.env.local`

Archivo: `.env.local`

Ejemplo (ya existe):

- `VITE_API_URL=http://localhost:3001/api`
- `VITE_SOCKET_URL=http://localhost:3001`

### 2.3 Elegí el puerto del backend (3000 o 3001)

Ahora mismo hay dos escenarios posibles:

- **Backend local**: usa `backend/.env` (por defecto `PORT=3001`)
- **Backend por Docker Compose**: el `docker-compose.yml` expone el backend en `PORT=3000`

Soluciones (elige UNA):

**Recomendado (backend local en 3001, coincide con frontend y scripts):**

1. Verificá `backend/.env`:
   - `PORT=3001`

**Alternativa (si tu backend corre en 3000, por ejemplo con Docker Compose):**

1. Editá `.env.local` y poné:
   - `VITE_API_URL=http://localhost:3000/api`
   - `VITE_SOCKET_URL=http://localhost:3000`

---

## 3) Arranque — Opción A (Docker Desktop) ✅

Esta es la forma más simple si tenés Docker.

### 3.1 Levantar PostgreSQL + Redis (y opcional backend por Docker)

Desde la raíz del proyecto:

```bash
cd C:/Users/Usuario/OneDrive/Desktop/SIGEP
docker compose up -d
```

Verificar contenedores:

```bash
docker ps
```

> El `docker-compose.yml` levanta:
>
> - Postgres en `localhost:5432`
> - Redis en `localhost:6379`
> - Backend en `localhost:3000` (si ese servicio está activo)

### 3.2 (Recomendado) Ejecutar backend local y DB/Redis en Docker

Si preferís editar código sin rebuild de contenedor:

1. Dejá **Postgres+Redis** en Docker corriendo
2. Corré backend local:

```bash
cd C:/Users/Usuario/OneDrive/Desktop/SIGEP/backend
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

### 3.3 Frontend

En otra terminal:

```bash
cd C:/Users/Usuario/OneDrive/Desktop/SIGEP
npm install
npm run dev
```

Abrir:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:<PUERTO>/api` (3000 o 3001)

---

## 4) Arranque — Opción B (sin Docker) 🧰

### 4.1 Instalar y arrancar PostgreSQL + Redis

- Instalá PostgreSQL (servidor) y arrancalo.
- Instalá Redis y arrancalo.

> Para usar `start-backend.bat` necesitás `psql` y `redis-cli` en PATH.

### 4.2 Crear DB y usuario (si no existe)

El proyecto usa por defecto:

- DB: `sigep_db`
- User: `sigep_user`
- Password: `sigep_password_2024`

Podés crearlo desde `psql` con un usuario admin (ej. `postgres`).

### 4.3 Instalar dependencias

```bash
cd C:/Users/Usuario/OneDrive/Desktop/SIGEP
npm install

cd C:/Users/Usuario/OneDrive/Desktop/SIGEP/backend
npm install
```

### 4.4 Migraciones + seed

```bash
cd C:/Users/Usuario/OneDrive/Desktop/SIGEP/backend
npm run db:generate
npm run db:migrate
npm run db:seed
```

### 4.5 Iniciar backend

```bash
cd C:/Users/Usuario/OneDrive/Desktop/SIGEP/backend
npm run dev
```

### 4.6 Iniciar frontend

```bash
cd C:/Users/Usuario/OneDrive/Desktop/SIGEP
npm run dev
```

---

## 5) Scripts de inicio para Windows (rápido)

En la raíz hay:

- `start-all.bat` (abre 2 ventanas)
- `start-backend.bat`
- `start-frontend.bat`

Importante:

- `start-backend.bat` **falla** si no tenés `psql` instalado/en PATH.
- Si no tenés `redis-cli`, solo muestra advertencia.

---

## 6) Usuarios y credenciales (DESARROLLO)

Estos usuarios se cargan en la base cuando corrés el seed:

Comando seed:

```bash
cd C:/Users/Usuario/OneDrive/Desktop/SIGEP/backend
npm run db:seed
```

### 6.1 Usuarios creados por backend (Prisma seed)

Fuente: `backend/prisma/seed.ts`

- `superadmin` / `SIGEP_2024` — Super Administrador
- `d1_admin` / `D1_2024` — Administrador D-1
- `d2_admin` / `D2_2024` — Administrador D-2
- `d3_admin` / `D3_2024` — Administrador D-3
- `d4_admin` / `D4_2024` — Administrador D-4
- `d5_admin` / `D5_2024` — Administrador D-5
- `asuntos_admin` / `Asuntos_2024` — Administrador Asuntos Internos
- `rurales_admin` / `Rurales_2024` — Administrador Delitos Rurales
- `digedrop_admin` / `Digedrop_2024` — Administrador DIGEDROP
- `prevencion_admin` / `Prevencion_2024` — Administrador Prevención Ciudadana
- `especiales_admin` / `Especiales_2024` — Administrador Unidades Especiales
- `institutos_admin` / `Institutos_2024` — Administrador Institutos e Instrucción
- `regionales_admin` / `Regionales_2024` — Administrador Unidades Regionales

> Recomendación: en entornos reales, **cambiar todas las contraseñas**, cambiar secretos JWT y no guardar credenciales en texto plano.

### 6.2 Usuarios locales de respaldo (frontend sin backend)

Si en `src/store/authStore.ts` ponés `USE_API = false`, el frontend permite login con usuarios locales.

Incluye (mínimo):

- `superadmin` / `SIGEP_2024`
- `d1_admin` / `D1_2024`
- `d2_admin` / `D2_2024`
- `d3_admin` / `D3_2024`
- `d4_admin` / `D4_2024`
- `d5_admin` / `D5_2024`

---

## 7) Verificación rápida

### 7.1 Ver backend (health check rápido)

Si el backend está levantado en `3001`:

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"superadmin\",\"password\":\"SIGEP_2024\"}"
```

Si está en `3000`, cambiá el puerto.

### 7.2 Ver frontend

Abrir: `http://localhost:5173`

---

## 8) Problemas comunes

- **`curl` da error (no conecta):** backend no está corriendo o el puerto no coincide con `VITE_API_URL`.
- **`docker ps` falla:** Docker Desktop no está instalado o no está iniciado.
- **`psql` “command not found”:** instalá PostgreSQL y asegurate que `psql` esté en el PATH (o no uses `start-backend.bat`).
- **CORS:** revisá `CORS_ORIGIN` en `.env` (debe ser `http://localhost:5173`).
