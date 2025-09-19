-- Script de migración para Azure SQL
CREATE DATABASE DanalystR;
GO

USE DanalystR;
GO

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
    caracteristicas NVARCHAR(MAX), -- JSON como texto en SQL Server
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

-- Tablas restantes con la misma lógica de conversión...
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

-- Triggers para actualizar fecha_actualizacion
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
GO

-- Índices y datos iniciales (convertidos a T-SQL)
CREATE INDEX idx_usuarios_email ON Usuarios(email);
CREATE INDEX idx_usuarios_membresia_id ON Usuarios(membresia_id);

-- Datos iniciales
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

-- Nota: Para el campo JSON en Membresias, en SQL Server puedes usar:
INSERT INTO Membresias (nombre_plan, precio, periodo, descripcion, caracteristicas) VALUES
('Básico', 49.999, 'mes', 'Acceso a 5 cursos premium...', 
'["Acceso a 5 cursos premium", "Certificados digitales", "Foro de la comunidad", "Actualizaciones mensuales"]');
GO
