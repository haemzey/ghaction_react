const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'dist');
const port = Number(process.env.PORT || 4173);
const mimeTypes = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
};

const server = http.createServer((request, response) => {
  const requestedPath = decodeURIComponent(request.url.split('?')[0]);
  const candidate = path.join(root, requestedPath === '/' ? 'index.html' : requestedPath);
  const filePath = candidate.startsWith(root) ? candidate : path.join(root, 'index.html');

  fs.stat(filePath, (error, stats) => {
    const resolvedPath = !error && stats.isFile() ? filePath : path.join(root, 'index.html');
    fs.readFile(resolvedPath, (readError, content) => {
      if (readError) {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('Frontend unavailable');
        return;
      }

      response.writeHead(200, {
        'Cache-Control': resolvedPath.endsWith('index.html') ? 'no-cache' : 'public, max-age=31536000, immutable',
        'Content-Type': mimeTypes[path.extname(resolvedPath)] || 'application/octet-stream',
      });
      response.end(content);
    });
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Frontend server listening on http://0.0.0.0:${port}`);
});
