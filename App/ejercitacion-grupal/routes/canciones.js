const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/canciones", async function (req, res) {
  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = { [Op.like]: "%" + req.query.Nombre + "%", };
  }
  let items = await db.canciones.findAndCountAll({
    attributes: ["IdCancion", "Nombre", "FechaLanzamiento", "Genero", "DuracionSeg"],
    order: [["Nombre", "ASC"]],
    where,
  });
  res.json(items.rows);
});

router.get("/api/canciones/:id", async function (req, res, next) {
  let items = await db.canciones.findOne({
    attributes: ["IdCancion", "Nombre", "FechaLanzamiento", "Genero", "DuracionSeg"],
    where: { IdCancion: req.params.id },
  });
  res.json(items);
});

router.post("/api/canciones/", async (req, res) => {
  try {
    let data = await db.canciones.create({
      Nombre: req.body.Nombre,
      FechaLanzamiento: req.body.FechaLanzamiento,
      Genero: req.body.Genero,
      DuracionSeg: req.body.DuracionSeg,
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

router.put("/api/canciones/:id", async (req, res) => {
  try {
    let item = await db.canciones.findOne({
      attributes: ["IdCancion", "Nombre", "FechaLanzamiento", "Genero", "DuracionSeg"],
      where: { IdCancion: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Cancion no encontrada" });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.DuracionSeg = req.body.DuracionSeg;
    item.Genero = req.body.Genero;
    item.FechaLanzamiento = req.body.FechaLanzamiento;    

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

router.delete("/api/canciones/:id", async (req, res) => {
  let filasBorradas = await db.canciones.destroy({
    where: { IdCancion: req.params.id },
  });

  if (filasBorradas == 1) res.sendStatus(200);

  else res.sendStatus(404);
});

module.exports = router;
