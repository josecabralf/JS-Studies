const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/personajes", async function (req, res) {
  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = { [Op.like]: "%" + req.query.Nombre + "%", };
  }
  let items = await db.personajes.findAndCountAll({
    attributes: ["IdPersonaje", "Nombre", "FechaAparicion", "Habilidad", "VecesInterpretado"],
    order: [["Nombre", "ASC"]],
    where,
  });
  res.json(items.rows);
});

router.get("/api/personajes/:id", async function (req, res, next) {
  let items = await db.personajes.findOne({
    attributes: ["IdPersonaje", "Nombre", "FechaAparicion", "Habilidad", "VecesInterpretado"],
    where: { IdPersonaje: req.params.id },
  });
  res.json(items);
});

router.post("/api/personajes/", async (req, res) => {
  try {
    let data = await db.personajes.create({
      Nombre: req.body.Nombre,
      FechaAparicion: req.body.FechaAparicion,
      Habilidad: req.body.Habilidad,
      VecesInterpretado: req.body.VecesInterpretado,
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

router.put("/api/personajes/:id", async (req, res) => {
  try {
    let item = await db.personajes.findOne({
      attributes: ["IdPersonaje", "Nombre", "FechaAparicion", "Habilidad", "VecesInterpretado"],
      where: { IdPersonaje: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Personaje no encontrado" });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.FechaAparicion = req.body.FechaAparicion;
    item.Habilidad = req.body.Habilidad;
    item.VecesInterpretado = req.body.VecesInterpretado;

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

router.delete("/api/personajes/:id", async (req, res) => {
  let filasBorradas = await db.personajes.destroy({
    where: { IdPersonaje: req.params.id },
  });

  if (filasBorradas == 1) res.sendStatus(200);

  else res.sendStatus(404);
});

module.exports = router;