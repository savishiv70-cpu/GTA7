const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json'};
const server = http.createServer((req,res)=>{
  const pathname = decodeURIComponent((req.url || '/').split('?')[0]);
  let file = path.join(root, pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, ''));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file,(err,data)=>{
    if(err){res.writeHead(404,{'Content-Type':'text/plain'});return res.end('Not found');}
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});
    res.end(data);
  });
});
const port = process.env.PORT || 3000;
server.listen(port,'0.0.0.0',()=>console.log('Grand City 7 running on '+port));
