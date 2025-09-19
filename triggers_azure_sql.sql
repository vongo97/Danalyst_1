-- Script separado para triggers (ejecutar después de crear todas las tablas en Danalyst_sql)
-- Verificar primero si los triggers no existen ya

IF NOT EXISTS (SELECT * FROM sys.triggers WHERE name = 'trg_Usuarios_Update')
BEGIN
    CREATE TRIGGER trg_Usuarios_Update
    ON Usuarios
    AFTER UPDATE
    AS
    BEGIN
        UPDATE Usuarios
        SET fecha_actualizacion = CURRENT_TIMESTAMP
        FROM Usuarios u
        INNER JOIN inserted i ON u.usuario_id = i.usuario_id
    END;
END;
GO

IF NOT EXISTS (SELECT * FROM sys.triggers WHERE name = 'trg_Cursos_Update')
BEGIN
    CREATE TRIGGER trg_Cursos_Update
    ON Cursos
    AFTER UPDATE
    AS
    BEGIN
        UPDATE Cursos
        SET fecha_actualizacion = CURRENT_TIMESTAMP
        FROM Cursos c
        INNER JOIN inserted i ON c.curso_id = i.curso_id
    END;
END;
GO

IF NOT EXISTS (SELECT * FROM sys.triggers WHERE name = 'trg_EntradasBlog_Update')
BEGIN
    CREATE TRIGGER trg_EntradasBlog_Update
    ON EntradasBlog
    AFTER UPDATE
    AS
    BEGIN
        UPDATE EntradasBlog
        SET fecha_actualizacion = CURRENT_TIMESTAMP
        FROM EntradasBlog e
        INNER JOIN inserted i ON e.entrada_id = i.entrada_id
    END;
END;
GO

-- Índices adicionales (con verificaciones de existencia)
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_cursos_categoria_id')
CREATE INDEX idx_cursos_categoria_id ON Cursos(categoria_id);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_cursos_nivel')
CREATE INDEX idx_cursos_nivel ON Cursos(nivel);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_entradasblog_slug')
CREATE INDEX idx_entradasblog_slug ON EntradasBlog(slug);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_entradasblog_autor_id')
CREATE INDEX idx_entradasblog_autor_id ON EntradasBlog(autor_id);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_entradasblog_categoria_id')
CREATE INDEX idx_entradasblog_categoria_id ON EntradasBlog(categoria_id);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_entradasblog_fecha_publicacion')
CREATE INDEX idx_entradasblog_fecha_publicacion ON EntradasBlog(fecha_publicacion DESC);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_pagos_usuario_id')
CREATE INDEX idx_pagos_usuario_id ON Pagos(usuario_id);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_pagos_membresia_id')
CREATE INDEX idx_pagos_membresia_id ON Pagos(membresia_id);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_mentorias_usuario_id')
CREATE INDEX idx_mentorias_usuario_id ON Mentorias(usuario_id);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_mentorias_mentor_id')
CREATE INDEX idx_mentorias_mentor_id ON Mentorias(mentor_id);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_mentorias_fecha_hora_sesion')
CREATE INDEX idx_mentorias_fecha_hora_sesion ON Mentorias(fecha_hora_sesion);
GO
