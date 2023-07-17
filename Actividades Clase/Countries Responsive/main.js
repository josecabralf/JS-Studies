const express = require('express');
const path = require('path');

const app = express();

// Configurar la ruta pública
app.use(express.static(path.join(__dirname, 'public')));

// Manejar todas las demás rutas
app.get('*', (req, res) => {
    res.status(404).send('Página no encontrada');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor web iniciado en el puerto ${port}`);
});