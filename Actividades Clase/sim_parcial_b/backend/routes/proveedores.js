const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/proveedores", async function (req, res) {
  // consulta de proveedores con filtros y paginacion

  let where = {};
  if (req.query.RazonSocial != undefined && req.query.RazonSocial !== "") {
    where.RazonSocial = {
      [Op.like]: "%" + req.query.RazonSocial + "%",
    };
  }
  let items = await db.proveedores.findAndCountAll({
    attributes: [
      "IdProveedor",
      "RazonSocial",
      "CUIT",
    ],
    order: [["RazonSocial", "ASC"]],
    where,
  });

  res.json(items.rows);
});

module.exports = router;
