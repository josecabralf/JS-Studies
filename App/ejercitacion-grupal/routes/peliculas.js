const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/peliculas", async function (req, res) {
  let where = {};
  if (req.query.Titulo != undefined && req.query.Titulo !== "") {
    where.Titulo = { [Op.like]: "%" + req.query.Titulo + "%", };
  }
  let items = await db.peliculas.findAndCountAll({
    attributes: ["IdPelicula", "Titulo", "FechaEstrenoArgentina", "Genero", "Recaudacion"],
    order: [["Titulo", "ASC"]],
    where,
  });
  res.json(items.rows);
});

router.get("/api/peliculas/:id", async function (req, res, next) {
  let items = await db.peliculas.findOne({
    attributes: ["IdPelicula", "Titulo", "FechaEstrenoArgentina", "Genero", "Recaudacion"],
    where: { IdPelicula: req.params.id },
  });
  res.json(items);
});

router.post("/api/peliculas/", async (req, res) => {
  try {
    let data = await db.peliculas.create({
      Titulo: req.body.Titulo,
      FechaEstrenoArgentina: req.body.FechaEstrenoArgentina,
      Genero: req.body.Genero,
      Recaudacion: req.body.Recaudacion,
    });
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validacion, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.put("/api/peliculas/:id", async (req, res) => {
  try {
    let item = await db.peliculas.findOne({
      attributes: ["IdPelicula", "Titulo", "FechaEstrenoArgentina", "Genero", "Recaudacion"],
      where: { IdPelicula: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Articulo no encontrado" });
      return;
    }
    item.Titulo = req.body.Titulo;
    item.FechaEstrenoArgentina = req.body.FechaEstrenoArgentina;
    item.Genero = req.body.Genero;
    item.Recaudacion = req.body.Recaudacion;

    await item.save();
    
    res.sendStatus(200);
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validacion, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.delete("/api/peliculas/:id", async (req, res) => {
  let filasBorradas = await db.peliculas.destroy({
    where: { IdPelicula: req.params.id },
  });

  if (filasBorradas == 1) res.sendStatus(200);

  else res.sendStatus(404);
});

module.exports = router;