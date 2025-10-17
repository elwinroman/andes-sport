# API de Gestión Deportiva

API REST desarrollada con NestJS para gestionar deportes, equipos, jugadores y partidos.

## Tecnologías

- NestJS
- TypeORM
- SQL Server
- TypeScript
- Class Validator

## Instalación

```bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de base de datos
```

## Configuración de Base de Datos

Asegúrate de tener SQL Server corriendo y actualiza el archivo `.env` con tus credenciales:

```env
DB_TYPE=mssql
DB_HOST=localhost
DB_PORT=1433
DB_USERNAME=sa
DB_PASSWORD=TuContraseña
DB_DATABASE=QASports
DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true
```

## Ejecutar la aplicación

```bash
# Modo desarrollo
pnpm start:dev

# Modo producción
pnpm build
pnpm start:prod
```

La API estará disponible en `http://localhost:3000/api`

## Endpoints de la API

### Deportes
- `GET /api/deportes` - Obtener todos los deportes
- `GET /api/deportes/:id` - Obtener un deporte por ID
- `POST /api/deportes` - Crear un nuevo deporte
- `PATCH /api/deportes/:id` - Actualizar un deporte
- `DELETE /api/deportes/:id` - Eliminar un deporte (soft delete)

**Ejemplo de creación:**
```json
{
  "cDeporte": "Fútbol",
  "cDetalles": "Deporte de equipo",
  "lVigente": true
}
```

### Equipos
- `GET /api/equipos` - Obtener todos los equipos
- `GET /api/equipos/:id` - Obtener un equipo por ID
- `POST /api/equipos` - Crear un nuevo equipo
- `PATCH /api/equipos/:id` - Actualizar un equipo
- `DELETE /api/equipos/:id` - Eliminar un equipo (soft delete)

**Ejemplo de creación:**
```json
{
  "cEquipo": "FC Barcelona",
  "cDetalle": "Equipo profesional de fútbol",
  "lVigente": true
}
```

### Jugadores
- `GET /api/jugadores` - Obtener todos los jugadores
- `GET /api/jugadores/:id` - Obtener un jugador por ID
- `POST /api/jugadores` - Crear un nuevo jugador
- `PATCH /api/jugadores/:id` - Actualizar un jugador
- `DELETE /api/jugadores/:id` - Eliminar un jugador (soft delete)

**Ejemplo de creación:**
```json
{
  "cNombreJugador": "Lionel",
  "cApellidoJugador": "Messi",
  "lVigente": true
}
```

### Estados de Partido
- `GET /api/estados-partido` - Obtener todos los estados
- `GET /api/estados-partido/:id` - Obtener un estado por ID
- `POST /api/estados-partido` - Crear un nuevo estado
- `PATCH /api/estados-partido/:id` - Actualizar un estado
- `DELETE /api/estados-partido/:id` - Eliminar un estado (soft delete)

**Ejemplo de creación:**
```json
{
  "cEstado": "Programado",
  "lVigente": true
}
```

### Partidos
- `GET /api/partidos` - Obtener todos los partidos (incluye relaciones)
- `GET /api/partidos/:id` - Obtener un partido por ID
- `POST /api/partidos` - Crear un nuevo partido
- `POST /api/partidos/bulk` - Crear múltiples partidos en una sola operación
- `PATCH /api/partidos/:id` - Actualizar un partido
- `DELETE /api/partidos/:id` - Eliminar un partido (soft delete)
- `GET /api/partidos/clasificacion/deporte/:idDeporte` - Obtener clasificación por deporte

**Ejemplo de creación de un partido:**
```json
{
  "idDeporte": 1,
  "idEquipoLocal": 1,
  "idEquipoVisitante": 2,
  "dFechaEvento": "2025-01-15T20:00:00Z",
  "dFechaInicio": "2025-01-15T20:00:00Z",
  "dFechaFin": "2025-01-15T22:00:00Z",
  "idEstado": 1,
  "lVigente": true
}
```

**Nota:** Los campos `dFechaInicio` y `dFechaFin` son opcionales y permiten registrar el inicio y fin real del partido.

**Ejemplo de creación múltiple (bulk):**
```json
{
  "partidos": [
    {
      "idDeporte": 1,
      "idEquipoLocal": 1,
      "idEquipoVisitante": 2,
      "dFechaEvento": "2025-01-15T20:00:00Z",
      "dFechaInicio": "2025-01-15T20:00:00Z",
      "dFechaFin": "2025-01-15T22:00:00Z",
      "idEstado": 1
    },
    {
      "idDeporte": 1,
      "idEquipoLocal": 3,
      "idEquipoVisitante": 4,
      "dFechaEvento": "2025-01-16T18:00:00Z",
      "dFechaInicio": "2025-01-16T18:00:00Z",
      "dFechaFin": "2025-01-16T20:00:00Z",
      "idEstado": 1
    }
  ]
}
```

### Equipo-Jugador (Relación)
- `GET /api/equipo-jugador` - Obtener todas las relaciones
- `GET /api/equipo-jugador/equipo/:idEquipo` - Obtener jugadores de un equipo
- `GET /api/equipo-jugador/jugador/:idJugador` - Obtener equipos de un jugador
- `GET /api/equipo-jugador/:idEquipo/:idJugador` - Obtener una relación específica
- `POST /api/equipo-jugador` - Crear una relación equipo-jugador
- `PATCH /api/equipo-jugador/:idEquipo/:idJugador` - Actualizar una relación
- `DELETE /api/equipo-jugador/:idEquipo/:idJugador` - Eliminar una relación (soft delete)

**Ejemplo de creación:**
```json
{
  "idEquipo": 1,
  "idJugador": 1,
  "lVigente": true
}
```

### Detalles de Fútbol
- `GET /api/detalles-futbol` - Obtener todos los detalles de partidos de fútbol
- `GET /api/detalles-futbol/:idPartido` - Obtener detalles de un partido específico
- `POST /api/detalles-futbol` - Registrar detalles de un partido de fútbol
- `PATCH /api/detalles-futbol/:idPartido` - Actualizar detalles de un partido
- `DELETE /api/detalles-futbol/:idPartido` - Eliminar detalles de un partido

**Ejemplo de creación:**
```json
{
  "idPartido": 1,
  "golesEquipoLocal": 3,
  "golesEquipoVisitante": 2,
}
```

### Detalles de Voley
Los detalles de voley permiten registrar múltiples sets por partido (llave primaria compuesta: idPartido + numeroSet).

- `GET /api/detalles-voley` - Obtener todos los detalles de partidos de voley
- `GET /api/detalles-voley/partido/:idPartido` - Obtener todos los sets de un partido
- `GET /api/detalles-voley/:idPartido/:numeroSet` - Obtener un set específico
- `POST /api/detalles-voley` - Registrar un set individual
- `POST /api/detalles-voley/bulk` - Registrar múltiples sets en una sola operación (recomendado)
- `PATCH /api/detalles-voley/:idPartido/:numeroSet` - Actualizar un set
- `DELETE /api/detalles-voley/:idPartido/:numeroSet` - Eliminar un set específico
- `DELETE /api/detalles-voley/partido/:idPartido` - Eliminar todos los sets de un partido

**Ejemplo de creación de un set individual:**
```json
{
  "idPartido": 1,
  "numeroSet": 1,
  "puntosEquipoLocal": 25,
  "puntosEquipoVisitante": 23
}
```

**Ejemplo de creación múltiple (recomendado):**
```json
{
  "sets": [
    {
      "idPartido": 1,
      "numeroSet": 1,
      "puntosEquipoLocal": 25,
      "puntosEquipoVisitante": 23
    },
    {
      "idPartido": 1,
      "numeroSet": 2,
      "puntosEquipoLocal": 23,
      "puntosEquipoVisitante": 25
    },
    {
      "idPartido": 1,
      "numeroSet": 3,
      "puntosEquipoLocal": 25,
      "puntosEquipoVisitante": 20
    }
  ]
}
```

**Nota:** El sistema cuenta automáticamente los sets ganados por cada equipo para la clasificación basándose en los puntos de cada set.

### Autenticación
- `POST /api/auth/register` - Registrar un nuevo usuario
- `POST /api/auth/login` - Iniciar sesión y obtener token JWT
- `GET /api/auth/profile` - Obtener perfil del usuario autenticado (requiere token)

**Ejemplo de registro:**
```json
{
  "username": "usuario123",
  "password": "password_seguro"
}
```

**Ejemplo de login:**
```json
{
  "username": "usuario123",
  "password": "password_seguro"
}
```

**Respuesta del login:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Usar el token en requests protegidos:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Estructura del Proyecto

```
src/
├── dto/                    # DTOs para validación
│   ├── create-deporte.dto.ts
│   ├── update-deporte.dto.ts
│   └── ...
├── entities/              # Entidades de TypeORM
│   ├── deporte.entity.ts
│   ├── equipo.entity.ts
│   ├── jugador.entity.ts
│   ├── equipo-jugador.entity.ts
│   ├── estado-partido.entity.ts
│   └── partido.entity.ts
├── modules/               # Módulos de la aplicación
│   ├── deporte/
│   │   ├── deporte.controller.ts
│   │   ├── deporte.service.ts
│   │   └── deporte.module.ts
│   ├── equipo/
│   ├── jugador/
│   ├── estado-partido/
│   ├── partido/
│   └── equipo-jugador/
├── app.module.ts          # Módulo principal
└── main.ts               # Punto de entrada
```

## Características

- Validación automática de datos con class-validator
- CORS habilitado
- Soft deletes (eliminación lógica)
- Relaciones entre entidades
- Manejo de errores
- Transformación automática de tipos
- Prefijo global de API (`/api`)

## Scripts Disponibles

```bash
# Desarrollo
pnpm start:dev

# Producción
pnpm build
pnpm start:prod

# Tests
pnpm test
pnpm test:watch
pnpm test:cov

# Linting
pnpm lint

# Formateo
pnpm format
```


## Levantar contenedores docker
Dev local
```bash
docker compose -f docker-core.yml -f docker-dev.yml -p dev up -d --build
```

Producción VPS
```bash
docker compose -f docker-core.yml -f docker-prod.yml -p prod up -d --build
```

Nueva instancia en VPS
```bash
docker compose -f docker-core.yml -f docker-prod.yml -p cert up -d --build
```