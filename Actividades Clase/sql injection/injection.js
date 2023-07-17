const express = require('express');
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite"
});

const Usuario = sequelize.define('Usuario', {
    nombre: Sequelize.STRING,
    email: Sequelize.STRING,
    contrasena: Sequelize.STRING
});

const app = express();
const port = 3000;

app.get('/login', async function(req, res){
    let nombre = req.query.nombre;
    let contrasena = req.query.contrasena;
    console.log(nombre + ' ' + contrasena);
    await Usuario.findAll({
        where: {
            nombre : nombre,
            contrasena : contrasena
        }})
        .then(result => {
            if (result.length > 0)
                res.json(result);
            else
                res.sendStatus(404);
        })
        .catch(error =>{
            res.sendStatus(404);
        })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    CrearUsuarios();
});

async function CrearUsuarios()
{
    await sequelize.sync();
    let nuevoUsuario = {
        nombre: "admin",
        email: "admin@example.com",
        contrasena: "Admin123"
    };

    await Usuario.create(nuevoUsuario)
    .then(usuario => {
        console.log(usuario);
    })
    .catch(error => {
        console.error(error);
    });

    let nuevoUsuario2 = {
        nombre: "user",
        email: "user@example.com",
        contrasena: "User123"
    };

    await Usuario.create(nuevoUsuario2)
    .then(usuario => {
        console.log(usuario);
        })
        .catch(error => {
            console.error(error);
        });
}