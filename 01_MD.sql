-- Versión más moderna y compacta (SQL Server 2016+)
ALTER TABLE EquipoJugador DROP CONSTRAINT IF EXISTS FK_EquipoJugador_Equipo;
ALTER TABLE EquipoJugador DROP CONSTRAINT IF EXISTS FK_EquipoJugador_Jugador;

ALTER TABLE Partidos DROP CONSTRAINT IF EXISTS FK_Partidos_Deporte;
ALTER TABLE Partidos DROP CONSTRAINT IF EXISTS FK_Partidos_EquipoLocal;
ALTER TABLE Partidos DROP CONSTRAINT IF EXISTS FK_Partidos_EquipoVisitante;
ALTER TABLE Partidos DROP CONSTRAINT IF EXISTS FK_Partidos_EstadoPartido;

-- Eliminar la tabla Deporte si ya existe
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'Deporte')
BEGIN
    DROP TABLE Deporte;
END

-- Crear la tabla Deporte
CREATE TABLE Deporte (
    idDeporte INT PRIMARY KEY,         -- Identificador único del deporte
    cDeporte VARCHAR(200) NOT NULL,    -- Nombre del deporte
    cDetalles VARCHAR(200),            -- Detalles del deporte
    lVigente BIT DEFAULT 1 NOT NULL,   -- Estado de vigencia del deporte (1 = vigente, 0 = no vigente)
    dFechaRegistra DATETIME DEFAULT GETDATE(), -- Fecha de registro
    dFechaModifica DATETIME NULL       -- Fecha de última modificación
);

-- Agregar propiedades extendidas a la tabla Deporte
EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Tabla que contiene información sobre deportes', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Deporte;

-- Agregar propiedades extendidas a las columnas
EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Identificador único para cada deporte', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Deporte, 
    @level2type = N'COLUMN', @level2name = idDeporte;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Nombre del deporte', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Deporte, 
    @level2type = N'COLUMN', @level2name = cDeporte;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Detalles adicionales sobre el deporte', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Deporte, 
    @level2type = N'COLUMN', @level2name = cDetalles;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Indica si el deporte está vigente (1 = vigente, 0 = no vigente)', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Deporte, 
    @level2type = N'COLUMN', @level2name = lVigente;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Fecha en la que se registra el deporte', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Deporte, 
    @level2type = N'COLUMN', @level2name = dFechaRegistra;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Fecha de última modificación del deporte, puede ser NULL si no se ha modificado', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Deporte, 
    @level2type = N'COLUMN', @level2name = dFechaModifica;


-- Eliminar la tabla Equipo si ya existe
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'Equipo')
BEGIN
    DROP TABLE Equipo;
END

-- Crear la tabla Equipo
CREATE TABLE Equipo (
    idEquipo INT PRIMARY KEY,          -- Identificador único del equipo
    cEquipo VARCHAR(200) NOT NULL,     -- Nombre del equipo
    cDetalle VARCHAR(200),             -- Detalles adicionales sobre el equipo
    lVigente BIT DEFAULT 1 NOT NULL,   -- Estado de vigencia del equipo (1 = vigente, 0 = no vigente)
    dFechaRegistra DATETIME DEFAULT GETDATE(), -- Fecha de registro
    dFechaModifica DATETIME NULL       -- Fecha de última modificación
);

-- Agregar propiedades extendidas a la tabla Equipo
EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Tabla que contiene información sobre los equipos', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Equipo;

-- Agregar propiedades extendidas a las columnas
EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Identificador único para cada equipo', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Equipo, 
    @level2type = N'COLUMN', @level2name = idEquipo;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Nombre del equipo', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Equipo, 
    @level2type = N'COLUMN', @level2name = cEquipo;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Detalles adicionales sobre el equipo', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Equipo, 
    @level2type = N'COLUMN', @level2name = cDetalle;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Indica si el equipo está vigente (1 = vigente, 0 = no vigente)', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Equipo, 
    @level2type = N'COLUMN', @level2name = lVigente;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Fecha en la que se registra el equipo', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Equipo, 
    @level2type = N'COLUMN', @level2name = dFechaRegistra;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Fecha de última modificación del equipo, puede ser NULL si no se ha modificado', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Equipo, 
    @level2type = N'COLUMN', @level2name = dFechaModifica;

-- Eliminar la tabla Jugador si ya existe
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'Jugador')
BEGIN
    DROP TABLE Jugador;
END

-- Crear la tabla Jugador
CREATE TABLE Jugador (
    idJugador INT PRIMARY KEY,          -- Identificador único del jugador
    cNombreJugador VARCHAR(200) NOT NULL,  -- Nombre del jugador (no puede ser NULL)
    cApellidoJugador VARCHAR(200) NOT NULL,  -- Apellido del jugador (no puede ser NULL)
    lVigente BIT DEFAULT 1 NOT NULL,           -- Estado de vigencia del jugador (1 = vigente, 0 = no vigente)
    dFechaRegistra DATETIME DEFAULT GETDATE(), -- Fecha de registro
    dFechaModifica DATETIME NULL            -- Fecha de última modificación
);

-- Agregar propiedades extendidas a la tabla Jugador
EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Tabla que contiene información sobre los jugadores', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Jugador;

-- Agregar propiedades extendidas a las columnas
EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Identificador único para cada jugador', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Jugador, 
    @level2type = N'COLUMN', @level2name = idJugador;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Nombre del jugador, no puede ser NULL', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Jugador, 
    @level2type = N'COLUMN', @level2name = cNombreJugador;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Apellido del jugador, no puede ser NULL', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Jugador, 
    @level2type = N'COLUMN', @level2name = cApellidoJugador;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Indica si el jugador está vigente (1 = vigente, 0 = no vigente)', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Jugador, 
    @level2type = N'COLUMN', @level2name = lVigente;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Fecha en la que se registra el jugador', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Jugador, 
    @level2type = N'COLUMN', @level2name = dFechaRegistra;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Fecha de última modificación del jugador, puede ser NULL si no se ha modificado', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Jugador, 
    @level2type = N'COLUMN', @level2name = dFechaModifica;

-- Eliminar la tabla EquipoJugador si ya existe
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'EquipoJugador')
BEGIN
    DROP TABLE EquipoJugador;
END

CREATE TABLE EquipoJugador (
    idEquipo INT NOT NULL,              -- Referencia al equipo
    idJugador INT NOT NULL,             -- Referencia al jugador
    dFechaRegistra DATETIME DEFAULT GETDATE(), -- Fecha de registro (por defecto, la fecha actual)
    dFechaModifica DATETIME NULL,       -- Fecha de última modificación (nulo por defecto)
    lVigente BIT DEFAULT 1 NOT NULL,    -- Estado de vigencia de la relación (1 = vigente, 0 = no vigente)
    PRIMARY KEY (idEquipo, idJugador),  -- Combinación única de equipo y jugador
    -- Claves foráneas con nombres estándar
    CONSTRAINT FK_EquipoJugador_Equipo FOREIGN KEY (idEquipo) 
        REFERENCES Equipo(idEquipo),
    CONSTRAINT FK_EquipoJugador_Jugador FOREIGN KEY (idJugador) 
        REFERENCES Jugador(idJugador)
);


-- Agregar propiedades extendidas a la tabla EquipoJugador
EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Tabla que contiene la relación entre los equipos y los jugadores', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = EquipoJugador;

-- Agregar propiedades extendidas a las columnas
EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Identificador del equipo, clave foránea que referencia a la tabla Equipo', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = EquipoJugador, 
    @level2type = N'COLUMN', @level2name = idEquipo;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Identificador del jugador, clave foránea que referencia a la tabla Jugador', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = EquipoJugador, 
    @level2type = N'COLUMN', @level2name = idJugador;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Fecha de asignación del jugador al equipo', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = EquipoJugador, 
    @level2type = N'COLUMN', @level2name = dFechaRegistra;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Indica si la relación equipo-jugador está vigente (1 = vigente, 0 = no vigente)', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = EquipoJugador, 
    @level2type = N'COLUMN', @level2name = lVigente;

-- Eliminar la tabla EstadoPartido si ya existe
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'EstadoPartido')
BEGIN
    DROP TABLE EstadoPartido;
END

-- Crear la tabla EstadoPartido
CREATE TABLE EstadoPartido (
    idEstado INT PRIMARY KEY,            -- Identificador único para el estado
    cEstado VARCHAR(100) NOT NULL,       -- Descripción del estado (Pendiente, Iniciado, Finalizado, etc.)
    lVigente BIT DEFAULT 1 NOT NULL,     -- Estado de vigencia del estado (1 = activo, 0 = no activo)
    dFechaRegistra DATETIME DEFAULT GETDATE(), -- Fecha de registro del estado
    dFechaModifica DATETIME NULL         -- Fecha de última modificación del estado
);

-- Agregar propiedades extendidas (metadata) a la tabla EstadoPartido
EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Tabla que contiene los diferentes estados posibles de un partido (Pendiente, Iniciado, Finalizado)', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = EstadoPartido;

-- Agregar propiedades extendidas a las columnas
EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Identificador único para cada estado', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = EstadoPartido, 
    @level2type = N'COLUMN', @level2name = idEstado;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Nombre del estado del partido (Pendiente, Iniciado, Finalizado)', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = EstadoPartido, 
    @level2type = N'COLUMN', @level2name = cEstado;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Indica si el estado del partido está vigente (1 = vigente, 0 = no vigente)', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = EstadoPartido, 
    @level2type = N'COLUMN', @level2name = lVigente;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Fecha de registro del estado del partido', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = EstadoPartido, 
    @level2type = N'COLUMN', @level2name = dFechaRegistra;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Fecha de última modificación del estado del partido', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = EstadoPartido, 
    @level2type = N'COLUMN', @level2name = dFechaModifica;

-- Eliminar la tabla Partidos si ya existe
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'Partidos')
BEGIN
    DROP TABLE Partidos;
END

-- Crear la tabla Partidos con la relación a EstadoPartido
CREATE TABLE Partidos (
    idPartido INT PRIMARY KEY,            -- Identificador único del partido
    idDeporte INT,                        -- Referencia al deporte (Fútbol, Vóley, etc.)
    idEquipoLocal INT,                    -- Referencia al equipo local
    idEquipoVisitante INT,                -- Referencia al equipo visitante
    dFechaEvento DATETIME,                -- Fecha y hora del evento
    idEstado INT,                         -- Referencia al estado del partido (Pendiente, Iniciado, Finalizado)
    lVigente BIT DEFAULT 1 NOT NULL,      -- Estado de vigencia del partido (1 = vigente, 0 = no vigente)
    dFechaRegistra DATETIME DEFAULT GETDATE(), -- Fecha de registro del partido
    dFechaModifica DATETIME NULL,         -- Fecha de última modificación del partido
    -- Claves foráneas con nombres estándar
    CONSTRAINT FK_Partidos_Deporte FOREIGN KEY (idDeporte) 
        REFERENCES Deporte(idDeporte),
    CONSTRAINT FK_Partidos_EquipoLocal FOREIGN KEY (idEquipoLocal) 
        REFERENCES Equipo(idEquipo),
    CONSTRAINT FK_Partidos_EquipoVisitante FOREIGN KEY (idEquipoVisitante) 
        REFERENCES Equipo(idEquipo),
    CONSTRAINT FK_Partidos_EstadoPartido FOREIGN KEY (idEstado) 
        REFERENCES EstadoPartido(idEstado)
);

-- Agregar propiedades extendidas a la tabla Partidos
EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Tabla que contiene información sobre los partidos y sus estados', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Partidos;

-- Agregar propiedades extendidas a las columnas
EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Identificador único para cada partido', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Partidos, 
    @level2type = N'COLUMN', @level2name = idPartido;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Referencia al deporte del partido (Fútbol, Vóley, etc.)', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Partidos, 
    @level2type = N'COLUMN', @level2name = idDeporte;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Referencia al equipo local', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Partidos, 
    @level2type = N'COLUMN', @level2name = idEquipoLocal;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Referencia al equipo visitante', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Partidos, 
    @level2type = N'COLUMN', @level2name = idEquipoVisitante;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Fecha y hora en que se juega el partido', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Partidos, 
    @level2type = N'COLUMN', @level2name = dFechaEvento;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Estado actual del partido (Pendiente, Iniciado, Finalizado)', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Partidos, 
    @level2type = N'COLUMN', @level2name = idEstado;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Indica si el partido está vigente (1 = vigente, 0 = no vigente)', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Partidos, 
    @level2type = N'COLUMN', @level2name = lVigente;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Fecha de registro del partido', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Partidos, 
    @level2type = N'COLUMN', @level2name = dFechaRegistra;

EXEC sys.sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Fecha de última modificación del partido', 
    @level0type = N'SCHEMA', @level0name = dbo, 
    @level1type = N'TABLE', @level1name = Partidos, 
    @level2type = N'COLUMN', @level2name = dFechaModifica;


CREATE TABLE DetallesFutbol (
    idPartido INT PRIMARY KEY,
    golesEquipoLocal INT NULL,  -- Goles del equipo local
    golesEquipoVisitante INT NULL,  -- Goles del equipo visitante
    CONSTRAINT FK_DetallesFutbol_Partidos FOREIGN KEY (idPartido) REFERENCES Partidos(idPartido)
);

CREATE TABLE DetallesVoley (
    idPartido INT PRIMARY KEY,
    setsEquipoLocal INT NULL,  -- Sets ganados por el equipo local
    setsEquipoVisitante INT NULL,  -- Sets ganados por el equipo visitante
    puntosEquipoLocal INT NULL,  -- Puntos en el último set del equipo local
    puntosEquipoVisitante INT NULL,  -- Puntos en el último set del equipo visitante
    CONSTRAINT FK_DetallesVoley_Partidos FOREIGN KEY (idPartido) REFERENCES Partidos(idPartido)
);