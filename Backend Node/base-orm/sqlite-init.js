// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/datosAPI.db");
   
  // vemos si la tabla A existe
  let existe = false;
  let res = null;


  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'canciones'", []
    );
    
  // Si tiene +1 registro: existe
  if (res.contar > 0) existe = true;

  // Si la db no existe
  if (!existe) {
    // Creamos la tabla
    await db.run(
      `CREATE table canciones( 
        IdCancion INTEGER PRIMARY KEY AUTOINCREMENT, 
        Nombre text NOT NULL, 
        FechaLanzamiento text NOT NULL, 
        Genero text NOT NULL, 
        DuracionSeg INTEGER NOT NULL );`
    );
    console.log("tabla canciones creada!");
    // Le insertamos los valores
    await db.run(
      `INSERT INTO canciones VALUES
      (1,'PEACHES','2023-04-07','SOFT ROCK',95),
      (2,'WE ARE HERE TOGETHER','2020-11-25',"CHILDREN'S MUSIC", 171),
      (3,'WE ALL WEAR CLOAKS','2012-12-11','ALTERNATIVE/INDIE', 150),
      (4,'OH HANUKKAH','2019-11-21','HANUKKAH MUSIC', 115),
      (5,'KUNG FU FIGHTING','2008-06-03','POP', 159),
      (6,'COSMIC I','2021-08-25','PSYCHEDELIC ROCK', 208),
      (7,'LOVE LIFTED ME','2012-04-27','COUNTRY', 279),
      (8,'BEAUTIFUL DREAMER','2012-04-27','COUNTRY', 108),
      (9,'GOODBYE SONG','2007-08-20',"CHILDREN'S MUSIC", 139),
      (10,'SAX MAN','2023-03-13','2000S ROCK', 126)`
    );
  }
  // cerrar la base
  db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;
