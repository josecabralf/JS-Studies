const express = require("express");
const cors = require('cors');

// crear servidor
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
}));

// crear db si no existe
require("./base-orm/sqlite-init");

// routes
const personajesRouter = require("./routes/personajes");
app.use(personajesRouter);
const cancionesRouter = require("./routes/canciones");
app.use(cancionesRouter);
const peliculasRouter = require("./routes/peliculas");
app.use(peliculasRouter);
const nominacionesRouter = require("./routes/nominaciones");
app.use(nominacionesRouter);

// PRUEBA!
app.get("/", (req, res) => {
  res.send("Bienvenido a la JackBlackAPI!");
});

// inicio
if (require.main) {
  const port = 4000;
  const hostname = '127.0.0.1';

  app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

module.exports = app; // para testing