import http from 'http';
import fs from 'fs';
import path from 'path';

const server = http.createServer((req, res) => {
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

  const content = fs.readFileSync(path.join(__dirname, `../public${req.url}`));

  res.end(content);
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
