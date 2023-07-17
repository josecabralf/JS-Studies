const express = require('express');
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/nominaciones", async function (req, res) {
  let where = {};
  if (req.query.NombrePremio != undefined && req.query.NombrePremio !== "") {
    where.NombrePremio = { [Op.like]: "%" + req.query.NombrePremio + "%", };
  }
  let items = await db.nominaciones.findAndCountAll({
    attributes: ["IdNominacion", "NombrePremio", "TipoPremio", "Descripcion", "FechaNominacion", "Resultado"],
    order: [["NombrePremio", "ASC"]],
    where,
  });
  res.json(items.rows);
});

router.get("/api/nominaciones/:id", async function (req, res, next) {
  let items = await db.nominaciones.findOne({
    attributes: ["IdNominacion", "NombrePremio", "TipoPremio", "Descripcion", "FechaNominacion", "Resultado"],
    where: { IdNominacion: req.params.id },
  });
  res.json(items);
});

router.post("/api/nominaciones/", async (req, res) => {
  try {
      let data = await db.nominaciones.create({
        NombrePremio: req.body.NombrePremio,
        TipoPremio: req.body.TipoPremio,
        Descripcion: req.body.Descripcion,
        FechaNominacion: req.body.FechaNominacion,
        Resultado: req.body.Resultado
      });
    res.status(200).json(data.dataValues);
  } 
  catch (err) {
    if (err instanceof ValidationError) {
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');        
      res.status(400).json({message : messages});
    } 
    else {
      throw err;
    }
  }
});

router.put("/api/nominaciones/:id", async (req, res) => {
  try {
    let item = await db.nominaciones.findOne({
      attributes: ["IdNominacion", "NombrePremio", "TipoPremio", "Descripcion", "FechaNominacion", "Resultado"],
      where: { IdNominacion: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Articulo no encontrado" });
      return;
    }

    item.NombrePremio = req.body.NombrePremio;
    item.TipoPremio = req.body.TipoPremio;
    item.Descripcion = req.body.Descripcion;
    item.FechaNominacion = req.body.FechaNominacion;
    item.Resultado = req.body.Resultado;
  
    await item.save();
    
    res.sendStatus(200);
  } 
  catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } 
    else {
      throw err;
    }
  }
});
  
router.delete("/api/nominaciones/:id", async (req, res) => {
    let filasBorradas = await db.nominaciones.destroy({
      where: { IdNominacion: req.params.id },
    });
  
    if (filasBorradas == 1) res.sendStatus(200);
  
    else res.sendStatus(404);
});
  
module.exports = router;