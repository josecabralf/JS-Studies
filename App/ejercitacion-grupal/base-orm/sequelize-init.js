// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./.data/datosAPI.db");

// definir los modelos de datos
const personajes = sequelize.define(
  "personajes",
  {
    IdPersonaje: {
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
    FechaAparicion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Fecha Aparicion es requerido",
        },
      },
    },
    Habilidad: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Habilidad es requerido",
        },
      },
      len: {
        args: [4, 30],
        msg: "Habilidad debe ser tipo carateres, entre 4 y 30 de longitud",
      },
    },
    VecesInterpretado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Veces Interpretado es requerido",
        },
      },
    }
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (personaje, options) {
        if (typeof personaje.Nombre === "string") {
          personaje.Nombre = personaje.Nombre.toUpperCase().trim();
        };
        if (typeof personaje.Habilidad === "string") {
          personaje.Habilidad = personaje.Habilidad.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
  }
);

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
      type: DataTypes.INTEGER,
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
        args: [3, 30],
        msg: "Genero debe ser tipo carateres, entre 3 y 30 de longitud",
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
          cancion.Genero = cancion.Genero.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
  }
);

const peliculas = sequelize.define(
  "peliculas",
  {
    IdPelicula: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Titulo: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Titulo es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Titulo debe ser de entre 5 y 30 caracteres de longitud",
        },
      },
    },
    FechaEstrenoArgentina: {
      type: DataTypes.INTEGER,
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
        len: {
          args: [4, 30],
          msg: "Genero debe ser de entre 4 y 30 caracteres de longitud",
        },
      },
    },
    Recaudacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Recaudación es requerido",
        },
      },
    }
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (pelicula, options) {
        if (typeof pelicula.Titulo === "string") {
          pelicula.Titulo = pelicula.Titulo.toUpperCase().trim();
        };
        if (typeof pelicula.Genero === "string") {
          pelicula.Genero = pelicula.Genero.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
  }
);

const nominaciones = sequelize.define(
  "nominaciones",
  {
    IdNominacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    NombrePremio: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Titulo es requerido",
        },
      },
      len: {
        args: [5, 30],
        msg: "Nombre del premio debe ser tipo carateres, entre 5 y 30 de longitud",
      },
    },

    TipoPremio: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El tipo de premio es requerido",
        },
      },
    },

    Descripcion: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La descripción del premio es requerida",
        },
      },
    },

    FechaNominacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Fecha de nominación requerida",
        },
      },
    },

    Resultado: {
      // 0 false, 1 true
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El resultado de la nominación es requerido",
        },
      },
    }
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (nominacion, options) {
        if (typeof nominacion.NombrePremio === "string") {
          nominacion.NombrePremio = nominacion.NombrePremio.toUpperCase().trim();
        };
        if (typeof nominacion.TipoPremio === "string") {
          nominacion.TipoPremio = nominacion.TipoPremio.toUpperCase().trim();
        }
        if (typeof nominacion.Descripcion === "string") {
          nominacion.Descripcion = nominacion.Descripcion.toUpperCase().trim();
        };
      },
    },
    timestamps: false,
  }
);


module.exports = {
  sequelize,
  canciones,
  personajes,
  peliculas,
  nominaciones,
};
