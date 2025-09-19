// Archivo server.js simplificado para Azure
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 8080;

console.log(`Iniciando servidor en modo ${dev ? 'desarrollo' : 'producción'}`);
console.log(`Puerto: ${port}`);

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Servidor listo en http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Error al iniciar el servidor:', err);
  process.exit(1);
});