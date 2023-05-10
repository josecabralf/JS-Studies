// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./.data/datosAPI.db");

// definir los modelos de datos
const canciones = sequelize.define(
  "canciones",
  {
    IdCancion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      // todo evitar que string autocomplete con espacios en blanco, deberia ser varchar sin espacios
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
      },
      len: {
        args: [5, 30],
        msg: "Nombre debe ser tipo carateres, entre 5 y 30 de longitud",
      },
    },
    FechaLanzamiento: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Fecha Lanzamiento es requerido",
        },
      },
    },
    Genero: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Genero es requerido",
        },
      },
      len: {
        args: [4, 30],
        msg: "Genero debe ser tipo carateres, entre 4 y 30 de longitud",
      },
    },
    DuracionSeg: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Duración en Segundos es requerido",
        },
      },
    }
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (cancion, options) {
        if (typeof cancion.Nombre === "string") {
          cancion.Nombre = cancion.Nombre.toUpperCase().trim();
        };
        if (typeof cancion.Genero === "string") {
          cancion.Genero = cancion.Nombre.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
  }
);

module.exports = {
  sequelize,
  canciones,
};
