-- Índices de performance para Danalyst
-- Ejecutar en producción después del deployment

-- Índices para tabla User
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"("email");
CREATE INDEX IF NOT EXISTS "User_role_idx" ON "User"("role");
CREATE INDEX IF NOT EXISTS "User_createdAt_idx" ON "User"("createdAt");

-- Índices para tabla Post
CREATE INDEX IF NOT EXISTS "Post_published_idx" ON "Post"("published");
CREATE INDEX IF NOT EXISTS "Post_authorId_idx" ON "Post"("authorId");
CREATE INDEX IF NOT EXISTS "Post_createdAt_idx" ON "Post"("createdAt");
CREATE INDEX IF NOT EXISTS "Post_publishedAt_idx" ON "Post"("publishedAt");

-- Índices para tabla Payment
CREATE INDEX IF NOT EXISTS "Payment_userId_idx" ON "Payment"("userId");
CREATE INDEX IF NOT EXISTS "Payment_status_idx" ON "Payment"("status");
CREATE INDEX IF NOT EXISTS "Payment_createdAt_idx" ON "Payment"("createdAt");

-- Índices compuestos para queries comunes
CREATE INDEX IF NOT EXISTS "Post_published_publishedAt_idx" ON "Post"("published", "publishedAt" DESC);
CREATE INDEX IF NOT EXISTS "Payment_userId_status_idx" ON "Payment"("userId", "status");

-- Análisis de performance (solo para PostgreSQL)
ANALYZE "User";
ANALYZE "Post";
ANALYZE "Payment";
ANALYZE "Account";
ANALYZE "Session";