const express = require("express");

// crear servidor
const app = express();
app.use(express.json());

// crear db si no existe
require("./base-orm/sqlite-init");

// routes
const cancionesRouter = require("./routes/canciones");
app.use(cancionesRouter);

// PRUEBA!
app.get("/", (req, res) => {
  res.send("Bienvenido a la JackBlackAPI!");
});

// inicio
if (require.main) {
  const port = 3000;
  const hostname = '127.0.0.1';

  app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

module.exports = app; // para testing