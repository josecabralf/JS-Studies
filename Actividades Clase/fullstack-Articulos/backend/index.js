const express = require('express');
const cors = require('cors');
const app = express();

// leer archivo de configuracion
require('dotenv').config();

// crear base si no existe
require("./base-orm/sqlite-init"); 

// para poder leer json en el body
app.use(express.json()); 

// Configuración de CORS
app.use(cors());

// Routes
const articulosRouter = require('./routes/articulos');
app.use(articulosRouter);

// controlar ruta
app.get("/", (req, res) => {
    res.send("Backend inicial dds-backend!");
});


// inicio
if (require.main) {
    const port = 4000;
    const hostname = '127.0.0.1';
    
    app.listen(port, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
}
  
module.exports = app;