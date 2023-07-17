// El módulo http permite realizar comunicaciones mediante el protocolo http
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// server será el servidor utilizado para está aplicación
const server = http.createServer( (req,res) => {
    // Aquí se especifica el código de éxito 200 para indicar que todo salió bien
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    res.end('Hello World!');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});