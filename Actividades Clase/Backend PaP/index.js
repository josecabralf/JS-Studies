const express = require("express");

// crear servidor
const app = express();

require("./base-orm/sqlite-init");  // crear base si no existe

app.use(express.json()); // para poder leer json en el body

// levantar ruta de api
const articulosfamiliasmockRouter = require("./routes/articulosfamiliasmock");
app.use(articulosfamiliasmockRouter);
const articulosfamiliasRouter = require("./routes/articulosfamilias");
app.use(articulosfamiliasRouter);
const articulosRouter = require("./routes/articulos");
app.use(articulosRouter);
const seguridadRouter = require("./routes/seguridad");
app.use(seguridadRouter);

// controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});

if (!module.parent) {
  const port = process.env.PORT || 3000; 
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });
}