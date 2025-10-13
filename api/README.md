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
- `PATCH /api/partidos/:id` - Actualizar un partido
- `DELETE /api/partidos/:id` - Eliminar un partido (soft delete)

**Ejemplo de creación:**
```json
{
  "idDeporte": 1,
  "idEquipoLocal": 1,
  "idEquipoVisitante": 2,
  "dFechaEvento": "2025-01-15T20:00:00Z",
  "idEstado": 1,
  "lVigente": true
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
