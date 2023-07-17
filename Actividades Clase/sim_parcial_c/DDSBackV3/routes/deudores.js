const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/deudores", async function (req, res) {
  // consulta de deudores con filtros y paginacion

  let where = {};
  if (req.query.DeudorDescripcion != undefined && req.query.DeudorDescripcion !== "") {
    where.DeudorDescripcion = {
      [Op.like]: "%" + req.query.DeudorDescripcion + "%",
    };
  }
  let items = await db.deudores.findAndCountAll({
    attributes: [
      "IdDeudor",
      "DeudorDescripcion",
      "MontoAdeudado",
    ],
    order: [["DeudorDescripcion", "ASC"]],
    where,
  });

  res.json(items.rows);
});

module.exports = router;
