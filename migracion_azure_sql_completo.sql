-- Script de migración completo para Azure SQL
-- Usando base de datos existente Danalyst_sql
-- No crear nueva base de datos ni usar USE statement



-- ### CREACIÓN DE TABLAS ###

CREATE TABLE Categorias (
    categoria_id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL UNIQUE,
    tipo NVARCHAR(50) NOT NULL,
    CONSTRAINT CK_Categorias_Tipo CHECK (tipo IN ('curso', 'blog'))
);

CREATE TABLE Membresias (
    membresia_id INT IDENTITY(1,1) PRIMARY KEY,
    nombre_plan NVARCHAR(100) NOT NULL UNIQUE,
    precio DECIMAL(10, 2) NOT NULL,
    periodo NVARCHAR(50) NOT NULL,
    descripcion NVARCHAR(MAX),
    caracteristicas NVARCHAR(MAX),
    esta_activa BIT DEFAULT 1
);

CREATE TABLE Usuarios (
    usuario_id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(255) NOT NULL,
    email NVARCHAR(255) NOT NULL UNIQUE,
    clave_hash NVARCHAR(255) NOT NULL,
    membresia_id INT,
    fecha_creacion DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (membresia_id) REFERENCES Membresias(membresia_id) ON DELETE SET NULL
);

CREATE TABLE Cursos (
    curso_id INT IDENTITY(1,1) PRIMARY KEY,
    titulo NVARCHAR(255) NOT NULL,
    descripcion NVARCHAR(MAX) NOT NULL,
    url_imagen NVARCHAR(255),
    categoria_id INT,
    nivel NVARCHAR(50),
    duracion NVARCHAR(100),
    enlace NVARCHAR(255),
    fecha_creacion DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES Categorias(categoria_id) ON DELETE SET NULL
);

CREATE TABLE EntradasBlog (
    entrada_id INT IDENTITY(1,1) PRIMARY KEY,
    slug NVARCHAR(255) NOT NULL UNIQUE,
    titulo NVARCHAR(255) NOT NULL,
    resumen NVARCHAR(MAX) NOT NULL,
    contenido_md NVARCHAR(MAX) NOT NULL,
    contenido_html NVARCHAR(MAX),
    autor_id INT,
    categoria_id INT,
    url_miniatura NVARCHAR(255),
    url_imagen NVARCHAR(255),
    fecha_publicacion DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (autor_id) REFERENCES Usuarios(usuario_id) ON DELETE SET NULL,
    FOREIGN KEY (categoria_id) REFERENCES Categorias(categoria_id) ON DELETE SET NULL
);

CREATE TABLE PlantillasGeneradas (
    plantilla_id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL,
    proposito NVARCHAR(MAX) NOT NULL,
    audiencia NVARCHAR(255),
    contenido_generado NVARCHAR(MAX) NOT NULL,
    fecha_creacion DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id) ON DELETE CASCADE
);

CREATE TABLE ProgresoUsuario (
    progreso_id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL,
    curso_id INT NOT NULL,
    modulos_completados INT DEFAULT 0,
    modulos_totales INT,
    ultimo_acceso DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    estado NVARCHAR(50) DEFAULT 'en_progreso',
    CONSTRAINT CK_Progreso_Estado CHECK (estado IN ('en_progreso', 'completado')),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES Cursos(curso_id) ON DELETE CASCADE,
    CONSTRAINT UQ_Progreso_Usuario_Curso UNIQUE (usuario_id, curso_id)
);

CREATE TABLE Pagos (
    pago_id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL,
    membresia_id INT,
    monto DECIMAL(10, 2) NOT NULL,
    fecha_pago DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    estado NVARCHAR(50) NOT NULL,
    metodo_pago NVARCHAR(100),
    transaccion_id NVARCHAR(255) UNIQUE,
    CONSTRAINT CK_Pagos_Estado CHECK (estado IN ('pendiente', 'completado', 'fallido', 'reembolsado')),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (membresia_id) REFERENCES Membresias(membresia_id) ON DELETE SET NULL
);

CREATE TABLE Mentorias (
    mentoria_id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL,
    mentor_id INT,
    nombre_mentor_externo NVARCHAR(255),
    fecha_hora_sesion DATETIME2 NOT NULL,
    duracion_minutos INT,
    estado NVARCHAR(50) DEFAULT 'programada',
    notas NVARCHAR(MAX),
    requisito_plan NVARCHAR(100),
    CONSTRAINT CK_Mentorias_Estado CHECK (estado IN ('programada', 'completada', 'cancelada', 'reprogramada')),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (mentor_id) REFERENCES Usuarios(usuario_id) ON DELETE SET NULL
);

CREATE TABLE RecursosGuardadosUsuario (
    recurso_guardado_id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL,
    tipo_recurso NVARCHAR(50) NOT NULL,
    recurso_id_fk INT NOT NULL,
    fecha_guardado DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT CK_Recursos_Tipo CHECK (tipo_recurso IN ('plantilla', 'dataset', 'articulo_blog', 'curso')),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id) ON DELETE CASCADE,
    CONSTRAINT UQ_Recursos_Usuario UNIQUE (usuario_id, tipo_recurso, recurso_id_fk)
);



-- ### TRIGGERS E ÍNDICES - EJECUTAR EN BATCHES SEPARADOS ###
-- Ejecutar después de crear todas las tablas
-- Verificar primero si los objetos no existen ya


IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_cursos_categoria_id')
CREATE INDEX idx_cursos_categoria_id ON Cursos(categoria_id);

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_cursos_nivel') 
CREATE INDEX idx_cursos_nivel ON Cursos(nivel);

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_entradasblog_slug')
CREATE INDEX idx_entradasblog_slug ON EntradasBlog(slug);

CREATE INDEX idx_entradasblog_autor_id ON EntradasBlog(autor_id);
CREATE INDEX idx_entradasblog_categoria_id ON EntradasBlog(categoria_id);
CREATE INDEX idx_entradasblog_fecha_publicacion ON EntradasBlog(fecha_publicacion DESC);
CREATE INDEX idx_pagos_usuario_id ON Pagos(usuario_id);
CREATE INDEX idx_pagos_membresia_id ON Pagos(membresia_id);
CREATE INDEX idx_mentorias_usuario_id ON Mentorias(usuario_id);
CREATE INDEX idx_mentorias_mentor_id ON Mentorias(mentor_id);
CREATE INDEX idx_mentorias_fecha_hora_sesion ON Mentorias(fecha_hora_sesion);

-- ### DATOS INICIALES ###
IF NOT EXISTS (SELECT * FROM Categorias WHERE nombre = 'Fundamentos')
INSERT INTO Categorias (nombre, tipo) VALUES

('Fundamentos', 'curso'),
('Bases de Datos', 'curso'),
('IA y ML', 'curso'),
('Visualización', 'curso'),
('Big Data', 'curso'),
('Estadísticas', 'curso'),
('Certificación', 'curso'),
('Python', 'blog'),
('SQL', 'blog'),
('Visualización de Datos', 'blog'),
('Análisis de Datos', 'blog');
GO

INSERT INTO Membresias (nombre_plan, precio, periodo, descripcion, caracteristicas) VALUES
('Básico', 19.99, 'mes', 'Acceso a 5 cursos premium, certificados digitales, foro de la comunidad, actualizaciones mensuales.', '["Acceso a 5 cursos premium", "Certificados digitales", "Foro de la comunidad", "Actualizaciones mensuales"]'),
('Profesional', 39.99, 'mes', 'Acceso a TODOS los cursos premium, certificados digitales verificados, comunidad privada con expertos, mentoría grupal mensual, recursos y datasets exclusivos, prioridad en soporte técnico.', '["Acceso a TODOS los cursos premium", "Certificados digitales verificados", "Comunidad privada con expertos", "Mentoría grupal mensual", "Recursos y datasets exclusivos", "Prioridad en soporte técnico"]'),
('Empresarial', 99.99, 'mes', 'Todo lo del Plan Profesional, mentoría personalizada semanal, proyectos guiados por expertos, acceso anticipado a nuevos cursos, licencias para equipos (hasta 5), soporte prioritario 24/7.', '["Todo lo del Plan Profesional", "Mentoría personalizada semanal", "Proyectos guiados por expertos", "Acceso anticipado a nuevos cursos", "Licencias para equipos (hasta 5)", "Soporte prioritario 24/7"]');
GO
