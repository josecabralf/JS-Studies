const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/articulos", async function (req, res) {
  // consulta de articulos con filtros y paginacion
  let where = {};
  if (req.query.nombre != undefined && req.query.nombre !== "") {
    where.Nombre = { [Op.like]: "%" + req.query.nombre + "%", };
  }
  if (req.query.activo != undefined && req.query.activo !== "") {
    where.Activo = req.query.activo === "true";
  }
  let items = await db.articulos.findAndCountAll({
    attributes: [
      "IdArticulo",
      "Nombre",
      "Precio",
      "Stock",
      "FechaAlta",
      "Activo",
    ],
    order: [["Nombre", "ASC"]],
    where,
  });
  res.json(items.rows);
});

router.get("/api/articulos/:id", async function(req, res) {
    let articulo = await db.articulos.findOne({        
        attributes: [
            "IdArticulo",
            "Nombre",
            "Precio",
            "Stock",
            "FechaAlta",
            "Activo",
          ],
        where: {IdArticulo : req.params.id}
        }
    )
    res.json(articulo);
})

router.delete("/api/articulos/:id", async function(req, res){
    let filasBorradas = await db.articulos.destroy({
        where: {IdArticulo: req.params.id}
    })
    if (filasBorradas === 1) res.status(200);
    else res.status(404);
})

module.exports = router;
