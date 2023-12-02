import http2 from 'node:http2';
import fs from 'node:fs';
import path from 'node:path';

const server = http2.createSecureServer(
  {
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
  },
  (req, res) => {
    if (req.url === '/') {
      const httmlPath = path.join(__dirname, '../public', 'index.html');
      const htmlFile = fs.readFileSync(httmlPath);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(htmlFile);
      return;
    }

    console.log(req.url);

    if (req.url?.endsWith('.css')) {
      res.writeHead(200, { 'Content-Type': 'text/css' });
    } else if (req.url?.endsWith('.js')) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
    }

    try {
      const content = fs.readFileSync(
        path.join(__dirname, `../public${req.url}`)
      );

      res.end(content);
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end();
    }
  }
);

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
