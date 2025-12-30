# 📘 Manual de Usuario - SIGEP

**Sistema de Gestión Estadística Policial**

---

## 📋 Índice

1. [Introducción](#1-introducción)
2. [Acceso al Sistema](#2-acceso-al-sistema)
3. [Usuarios y Contraseñas](#3-usuarios-y-contraseñas)
4. [Navegación del Sistema](#4-navegación-del-sistema)
5. [Módulos del Sistema](#5-módulos-del-sistema)
6. [Funciones Principales](#6-funciones-principales)
7. [Preguntas Frecuentes](#7-preguntas-frecuentes)

---

## 1. 📌 Introducción

**SIGEP** es un sistema web diseñado para la gestión y visualización de estadísticas policiales. Permite a los diferentes departamentos registrar, editar y consultar datos comparativos entre períodos.

### Características Principales

- ✅ Dashboard centralizado con estadísticas
- ✅ Gestión de datos por departamento
- ✅ Comparación de períodos (anterior vs actual)
- ✅ Historial de cambios y auditoría
- ✅ Control de acceso por roles

---

## 2. 🔑 Acceso al Sistema

### 2.1 Iniciar Sesión

1. Abra su navegador web
2. Ingrese a la URL del sistema: `http://localhost:5173`
3. Verá la pantalla de login:

![Login](Pantalla de inicio de sesión)

4. Ingrese su **usuario** y **contraseña**
5. Haga clic en **"Iniciar Sesión"**

### 2.2 Cerrar Sesión

1. Busque el botón de **logout** en la barra de navegación
2. Confirme el cierre de sesión
3. Será redirigido a la pantalla de login

> [!TIP]
> **Siempre cierre sesión al terminar de usar el sistema**, especialmente en computadoras compartidas.

---

## 3. 👥 Usuarios y Contraseñas

### 3.1 Tabla de Usuarios del Sistema

| Usuario | Contraseña | Departamento | Rol |
|---------|------------|--------------|-----|
| `superadmin` | `SIGEP_2024` | Todos | Administrador General |
| `d1_admin` | `D1_2024` | Personal (D-1) | Administrador |
| `d2_admin` | `D2_2024` | Inteligencia Criminal (D-2) | Administrador |
| `d3_admin` | `D3_2024` | Operaciones Policiales (D-3) | Administrador |
| `d4_admin` | `D4_2024` | Logística (D-4) | Administrador |
| `d5_admin` | `D5_2024` | Judicial (D-5) | Administrador |
| `asuntos_admin` | `Asuntos_2024` | Asuntos Internos | Administrador |
| `rurales_admin` | `Rurales_2024` | Delitos Rurales | Administrador |
| `digedrop_admin` | `Digedrop_2024` | Drogas Peligrosas | Administrador |
| `prevencion_admin` | `Prevencion_2024` | Prevención Ciudadana | Administrador |
| `especiales_admin` | `Especiales_2024` | Unidades Especiales | Administrador |
| `institutos_admin` | `Institutos_2024` | Institutos e Instrucción | Administrador |
| `regionales_admin` | `Regionales_2024` | Unidades Regionales | Administrador |

### 3.2 Permisos por Usuario

| Usuario | Permisos |
|---------|----------|
| `superadmin` | `all`, `read`, `write`, `export`, `admin` (acceso total) |
| Administradores de departamento | `read`, `write`, `export` + acceso a su departamento |

### 3.3 Roles Explicados

| Rol | ¿Qué puede hacer? |
|-----|-------------------|
| **ADMIN** | Ver, editar y exportar datos. Gestionar configuraciones. |
| **EDITOR** | Ver y editar datos de su departamento. |
| **VIEWER** | Solo ver datos (sin modificar). |

> [!IMPORTANT]
> **Cambie las contraseñas por defecto** después del primer inicio de sesión para mayor seguridad.

---

## 4. 🧭 Navegación del Sistema

### 4.1 Estructura de la Aplicación

```
┌─────────────────────────────────────────┐
│              BARRA SUPERIOR             │
│  [Logo] [Navegación] [Usuario] [Logout] │
├─────────────────────────────────────────┤
│                                         │
│           ÁREA DE CONTENIDO             │
│                                         │
│    Dashboard / Departamentos / etc.     │
│                                         │
└─────────────────────────────────────────┘
```

### 4.2 Menú de Navegación

Después de iniciar sesión, verá las siguientes opciones según sus permisos:

| Menú | Descripción | ¿Quién puede acceder? |
|------|-------------|----------------------|
| **Dashboard** | Vista general de estadísticas | Todos los usuarios |
| **D-1 Personal** | Datos del departamento de Personal | superadmin, d1_admin |
| **D-2 Inteligencia** | Datos de Inteligencia Criminal | superadmin, d2_admin |
| **D-3 Operaciones** | Datos de Operaciones Policiales | superadmin, d3_admin |
| **D-4 Logística** | Datos de Logística | superadmin, d4_admin |
| **D-5 Judicial** | Datos del departamento Judicial | superadmin, d5_admin |
| **Asuntos Internos** | Dirección de Asuntos Internos | superadmin, asuntos_admin |
| **Delitos Rurales** | Dirección de Delitos Rurales | superadmin, rurales_admin |
| **DIGEDROP** | Drogas Peligrosas | superadmin, digedrop_admin |
| **Prevención** | Prevención Ciudadana | superadmin, prevencion_admin |
| **Unidades Especiales** | Unidades Especiales | superadmin, especiales_admin |
| **Institutos** | Institutos e Instrucción | superadmin, institutos_admin |
| **Unidades Regionales** | Unidades Regionales | superadmin, regionales_admin |
| **Historial** | Registro de cambios | superadmin |

---

## 5. 📊 Módulos del Sistema

### 5.1 Dashboard

El dashboard muestra una vista general con:

- 📈 Estadísticas principales
- 🔄 Comparación de períodos
- 📋 Resumen por departamento

### 5.2 Módulos de Departamento

Cada departamento tiene su propia sección con tablas de datos comparativos:

#### Ejemplo: D-1 Personal

| Tabla | Datos que contiene |
|-------|-------------------|
| Total de Personal Policial | Fuerza efectiva, población, densidad policial |
| Personal por Tipo | Personal superior y subalterno |
| Personal por Género | Masculino y femenino |
| Oficiales Superiores | Comisarios generales, mayores, inspectores |
| Oficiales Jefes | Comisarios y subcomisarios |

#### Ejemplo: D-3 Operaciones

| Tabla | Datos que contiene |
|-------|-------------------|
| Delitos Contra la Propiedad | Hurto, robo, robo agravado |
| Homicidios | Dolosos y culposos |

#### Ejemplo: DIGEDROP

| Tabla | Datos que contiene |
|-------|-------------------|
| Sustancias Secuestradas | Cocaína, marihuana, pasta base (kg) |
| Operativos Realizados | Allanamientos y detenidos |

---

## 6. ⚙️ Funciones Principales

### 6.1 Visualizar Datos

1. Navegue al departamento deseado
2. Verá las tablas con datos comparativos
3. Cada tabla muestra:
   - **Período Anterior**: Datos del período pasado
   - **Período Actual**: Datos del período corriente
   - **Diferencia**: Cambio entre períodos (automático)

### 6.2 Editar Datos

> [!NOTE]
> Solo usuarios con permiso `write` pueden editar datos.

1. Navegue a la tabla que desea editar
2. Haga clic en el campo que desea modificar
3. Ingrese el nuevo valor
4. Los cambios se guardan automáticamente
5. El historial registra cada modificación

### 6.3 Ver Historial de Cambios

1. Vaya a la sección **Historial**
2. Verá un listado de todos los cambios realizados:
   - **Quién**: Usuario que realizó el cambio
   - **Cuándo**: Fecha y hora
   - **Qué**: Campo y tabla modificados
   - **Antes/Después**: Valores anterior y nuevo

### 6.4 Exportar Datos

Los usuarios con permiso `export` pueden:

1. Navegar al módulo deseado
2. Buscar el botón de **Exportar**
3. Seleccionar formato de exportación
4. Descargar el archivo

---

## 7. ❓ Preguntas Frecuentes

### ¿Olvidé mi contraseña?

Contacte al superadministrador (`superadmin`) para restablecer su contraseña.

### ¿Por qué no puedo ver ciertos módulos?

Solo puede acceder a los módulos asignados a su usuario. Si necesita acceso adicional, solicítelo al administrador.

### ¿Cómo sé si mis cambios se guardaron?

El sistema guarda automáticamente. Puede verificarlo en el **Historial de Cambios**.

### ¿Puedo trabajar sin conexión?

No, SIGEP requiere conexión al servidor para funcionar correctamente.

### ¿Cuánto tiempo dura mi sesión?

- La sesión activa dura **1 hora**
- Se renueva automáticamente si está usando el sistema
- Después de 7 días de inactividad, deberá volver a iniciar sesión

---

## 📞 Soporte

| Problema | Contactar a |
|----------|-------------|
| Acceso denegado | Administrador de su departamento |
| Error en el sistema | Superadministrador |
| Solicitar nuevos permisos | Administrador de su departamento |

---

## 🚀 Inicio Rápido del Sistema

### Para iniciar la aplicación:

1. **Opción 1 - Script automático**:
   - Ejecute el archivo `start-all.bat` en la carpeta principal

2. **Opción 2 - Manual**:
   ```bash
   # Terminal 1 (Backend)
   cd backend
   npm run dev
   
   # Terminal 2 (Frontend)
   npm run dev
   ```

3. Abra el navegador en: `http://localhost:5173`

### Requisitos:
- Node.js instalado
- PostgreSQL funcionando
- Redis funcionando (opcional, pero recomendado)

---

*Manual de Usuario SIGEP v1.0*
*Actualizado: 30 de Diciembre de 2024*
