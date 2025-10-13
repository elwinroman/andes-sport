# Documentación de Migraciones - TypeORM

## Descripción General

Este documento describe el proceso de configuración y ejecución de migraciones de base de datos usando TypeORM en el proyecto QA Sports API.

## Configuración Realizada

### 1. Instalación de Dependencias

Se instaló el paquete `dotenv` para la gestión de variables de entorno:

```bash
pnpm install dotenv
```

### 2. Archivo de Configuración DataSource

Se creó el archivo [src/data-source.ts](src/data-source.ts) que configura la conexión a la base de datos y las rutas de migraciones:

```typescript
import { config } from 'dotenv'
import { DataSource } from 'typeorm'

// Cargar variables de entorno
config()

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '1433', 10),
  username: process.env.DB_USERNAME || 'sa',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'SI_AndesSport',
  entities: ['src/entities/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  synchronize: false,
  logging: true,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
  },
})
```

**Nota importante:** `synchronize` está configurado como `false` para producción. Esto significa que TypeORM NO sincronizará automáticamente el esquema de la base de datos, y se deben usar migraciones para cualquier cambio.

### 3. Scripts NPM Agregados

Se agregaron los siguientes scripts al [package.json](package.json):

```json
{
  "scripts": {
    "typeorm": "typeorm-ts-node-commonjs",
    "migration:generate": "npm run typeorm -- migration:generate -d src/data-source.ts",
    "migration:run": "npm run typeorm -- migration:run -d src/data-source.ts",
    "migration:revert": "npm run typeorm -- migration:revert -d src/data-source.ts",
    "migration:show": "npm run typeorm -- migration:show -d src/data-source.ts"
  }
}
```

### 4. Estructura de Carpetas

Se creó la carpeta `src/migrations/` donde se almacenarán todas las migraciones.

## Migración Inicial Ejecutada

### Generación de la Migración

Se generó la migración inicial basada en las entidades existentes:

```bash
pnpm run migration:generate src/migrations/InitialSchema
```

Esto creó el archivo [src/migrations/1760307807180-InitialSchema.ts](src/migrations/1760307807180-InitialSchema.ts)

### Tablas Creadas

La migración inicial creó las siguientes tablas en la base de datos:

#### 1. **Deporte**
- `idDeporte` (PK, IDENTITY)
- `cDeporte` (varchar(200))
- `cDetalles` (varchar(200), nullable)
- `lVigente` (bit, default: 1)
- `dFechaRegistra` (datetime, default: getdate())
- `dFechaModifica` (datetime, nullable, default: getdate())

#### 2. **EstadoPartido**
- `idEstado` (PK, IDENTITY)
- `cEstado` (varchar(100))
- `lVigente` (bit, default: 1)
- `dFechaRegistra` (datetime, default: getdate())
- `dFechaModifica` (datetime, nullable, default: getdate())

#### 3. **Equipo**
- `idEquipo` (PK, IDENTITY)
- `cEquipo` (varchar(200))
- `cDetalle` (varchar(200), nullable)
- `lVigente` (bit, default: 1)
- `dFechaRegistra` (datetime, default: getdate())
- `dFechaModifica` (datetime, nullable, default: getdate())

#### 4. **Jugador**
- `idJugador` (PK, IDENTITY)
- `cNombreJugador` (varchar(200))
- `cApellidoJugador` (varchar(200))
- `lVigente` (bit, default: 1)
- `dFechaRegistra` (datetime, default: getdate())
- `dFechaModifica` (datetime, nullable, default: getdate())

#### 5. **Partidos**
- `idPartido` (PK, IDENTITY)
- `idDeporte` (int, nullable, FK → Deporte)
- `idEquipoLocal` (int, nullable, FK → Equipo)
- `idEquipoVisitante` (int, nullable, FK → Equipo)
- `dFechaEvento` (datetime, nullable)
- `idEstado` (int, nullable, FK → EstadoPartido)
- `lVigente` (bit, default: 1)
- `dFechaRegistra` (datetime, default: getdate())
- `dFechaModifica` (datetime, nullable, default: getdate())

#### 6. **EquipoJugador** (Tabla de relación muchos a muchos)
- `idEquipo` (PK, FK → Equipo)
- `idJugador` (PK, FK → Jugador)
- `lVigente` (bit, default: 1)
- `dFechaRegistra` (datetime, default: getdate())
- `dFechaModifica` (datetime, nullable, default: getdate())

#### 7. **DetallesFutbol**
- `idPartido` (PK, FK → Partidos)
- `golesEquipoLocal` (int, nullable)
- `golesEquipoVisitante` (int, nullable)

#### 8. **DetallesVoley**
- `idPartido` (PK, FK → Partidos)
- `setsEquipoLocal` (int, nullable)
- `setsEquipoVisitante` (int, nullable)
- `puntosEquipoLocal` (int, nullable)
- `puntosEquipoVisitante` (int, nullable)

### Relaciones (Foreign Keys)

- `Partidos.idDeporte` → `Deporte.idDeporte`
- `Partidos.idEquipoLocal` → `Equipo.idEquipo`
- `Partidos.idEquipoVisitante` → `Equipo.idEquipo`
- `Partidos.idEstado` → `EstadoPartido.idEstado`
- `EquipoJugador.idEquipo` → `Equipo.idEquipo`
- `EquipoJugador.idJugador` → `Jugador.idJugador`
- `DetallesFutbol.idPartido` → `Partidos.idPartido`
- `DetallesVoley.idPartido` → `Partidos.idPartido`

### Ejecución de la Migración

La migración se ejecutó exitosamente con el siguiente comando:

```bash
pnpm run migration:run
```

**Resultado:**
- Se creó la tabla `migrations` para el control de versiones
- Se ejecutaron todas las sentencias CREATE TABLE
- Se agregaron todas las restricciones FOREIGN KEY
- La migración se registró en la tabla `migrations`

## Comandos Útiles

### Ver el estado de las migraciones

```bash
pnpm run migration:show
```

### Generar una nueva migración

Cuando se modifiquen las entidades, generar una nueva migración:

```bash
pnpm run migration:generate src/migrations/NombreDeLaMigracion
```

### Ejecutar migraciones pendientes

```bash
pnpm run migration:run
```

### Revertir la última migración

```bash
pnpm run migration:revert
```

## Buenas Prácticas

1. **Nunca editar migraciones ya ejecutadas**: Las migraciones ejecutadas no deben modificarse, crear una nueva migración para cambios adicionales.

2. **Nombres descriptivos**: Usar nombres descriptivos para las migraciones que reflejen los cambios realizados.

3. **Revisar antes de ejecutar**: Siempre revisar el contenido de la migración generada antes de ejecutarla en producción.

4. **Backup de base de datos**: Realizar un backup de la base de datos antes de ejecutar migraciones en producción.

5. **Probar en desarrollo**: Probar las migraciones en un ambiente de desarrollo antes de aplicarlas en producción.

6. **Control de versiones**: Incluir las migraciones en el control de versiones (git) para que todo el equipo tenga acceso a ellas.

## Variables de Entorno Requeridas

Asegurarse de que el archivo `.env` contenga las siguientes variables:

```env
DB_TYPE=mssql
DB_HOST=<host_del_servidor>
DB_PORT=1433
DB_USERNAME=<usuario>
DB_PASSWORD=<contraseña>
DB_DATABASE=SI_AndesSport
DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true
```

## Troubleshooting

### Error de conexión a la base de datos

Verificar que:
- El servidor de base de datos esté accesible
- Las credenciales en `.env` sean correctas
- El puerto 1433 esté abierto en el firewall

### Error "Cannot find module dotenv"

Instalar la dependencia:

```bash
pnpm install dotenv
```

### Migración no se detecta

Verificar que:
- El archivo de migración esté en la carpeta `src/migrations/`
- El nombre del archivo siga el formato: `timestamp-NombreMigracion.ts`
- El archivo exporte una clase que implemente `MigrationInterface`

## Referencias

- [Documentación oficial de TypeORM Migrations](https://typeorm.io/migrations)
- [NestJS con TypeORM](https://docs.nestjs.com/techniques/database)
