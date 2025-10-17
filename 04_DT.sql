INSERT INTO EstadoPartido (cEstado, lVigente, dFechaRegistra)
VALUES
('Programado', 1, GETDATE()),
('En curso', 1, GETDATE()),
('Medio tiempo', 1, GETDATE()),
('Finalizado', 1, GETDATE()),
('Cancelado', 1, GETDATE()),
('Abandonado', 1, GETDATE()),
('Pendiente', 1, GETDATE());

INSERT INTO Deporte (cDeporte, cDetalles, lVigente, dFechaRegistra)
VALUES
('Fútbol', 'Deporte futbol', 1, GETDATE()),
('Voley', 'Deporte voley', 1, GETDATE());
