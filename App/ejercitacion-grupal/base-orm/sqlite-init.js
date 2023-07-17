// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/datosAPI.db");
   
  // vemos si la tabla A existe
  let existeCanciones = false;
  let existePersonajes = false;
  let existePeliculas = false;
  let existeNominaciones = false;
  
  let resCanciones = null;
  let resPersonajes = null;
  let resPeliculas = null;
  let resNominaciones = null;


  resCanciones = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'canciones'", []
    );
  
  resPersonajes = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'personajes'", []
  );

  resPeliculas = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'peliculas'", []
  );

  resNominaciones = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'nominaciones'", []
  )

  // Si tiene +1 registro: existe
  if (resCanciones.contar > 0) existeCanciones = true;
  if (resPersonajes.contar > 0) existePersonajes = true;
  if (resPeliculas.contar > 0) existePeliculas = true;
  if (resNominaciones.contar > 0) existeNominaciones = true;

  // Si la db no existe
  if (!existeCanciones) {
    // Creamos la tabla
    await db.run(
      `CREATE table canciones( 
        IdCancion INTEGER PRIMARY KEY AUTOINCREMENT, 
        Nombre text NOT NULL, 
        FechaLanzamiento INTEGER NOT NULL, 
        Genero text NOT NULL, 
        DuracionSeg INTEGER NOT NULL );`
    );
    console.log("tabla canciones creada!");
    // Le insertamos los valores
    await db.run(
      `INSERT INTO canciones VALUES
      (1,'PEACHES',1680825600,'SOFT ROCK',95),
      (2,'WE ARE HERE TOGETHER',1606262400,"CHILDREN'S MUSIC", 171),
      (3,'WE ALL WEAR CLOAKS',1355184000,'ALTERNATIVE/INDIE', 150),
      (4,'OH HANUKKAH',1574294400,'HANUKKAH MUSIC', 115),
      (5,'KUNG FU FIGHTING',1204761600,'POP', 159),
      (6,'COSMIC I',1629849600,'PSYCHEDELIC ROCK', 208),
      (7,'LOVE LIFTED ME',1335484800,'COUNTRY', 279),
      (8,'BEAUTIFUL DREAMER',1335484800,'COUNTRY', 108),
      (9,'GOODBYE SONG',1187568000,"CHILDREN'S MUSIC", 139),
      (10,'SAX MAN',1678665600,'2000S ROCK', 126)`
    );
    console.log("tabla canciones cargada!");
  }

  if (!existePersonajes) {
    // Creamos la tabla
    await db.run(
      `CREATE table personajes( 
        IdPersonaje INTEGER PRIMARY KEY AUTOINCREMENT, 
        Nombre text NOT NULL, 
        FechaAparicion INTEGER NOT NULL, 
        Habilidad text NOT NULL, 
        VecesInterpretado INTEGER NOT NULL );`
    );
    console.log("tabla personajes creada!");
    // Le insertamos los valores
    await db.run(
      `INSERT INTO personajes VALUES
      (1,'PO',1212710400,'KUNG FU',3),
      (2,'DEWEY FINN',1076544000,"MÚSICA ROCK", 1),
      (3,'BOWSER',1680739200,'COMANDANTE DE EJÉRCITOS', 1),
      (4,'PROFESOR SHELLY OBERON',1578528000,'ARQUEOLOGÍA', 3),
      (5,'BILLY-GLENN NORRIS',850435200,'RECARGAR UN RIFLE', 1),
      (6,'JEFF PORTNOY',1218585600,'ACTUACIÓN', 1),
      (7,'IGNACIO',1150416000,'LUCHA LIBRE', 1),
      (8,'CARL DENHAM',1134604800,'DIRECTOR DE CINE', 1),
      (9,'SLAPPY',1444953600,"MUÑECO DE VENTRILOCUO", 2),
      (10,'LEMUEL GULLIVER',1293235200,'PERIODISTA', 1)`
    );
    console.log("tabla personajes cargada!");
  }

  if (!existePeliculas) {
    // Creamos la tabla
    await db.run(
      `CREATE table peliculas( 
        IdPelicula INTEGER PRIMARY KEY AUTOINCREMENT, 
        Titulo text NOT NULL, 
        FechaEstrenoArgentina INTEGER NOT NULL, 
        Genero text NOT NULL, 
        Recaudacion INTEGER NOT NULL );`
    );
    console.log("tabla peliculas creada!");
    // Le insertamos los valores
    await db.run(
      `INSERT INTO peliculas VALUES
      (1,'ESCUELA DE ROCK',1076544000,'Comedia', 131282949),
      (2,'KUNG FU PANDA',1215043200,'Animación-Infantil', 631744560),
      (3,'JUMANJI: WELCOME TO THE JUNGLE',1515024000,'Acción-Comedia', 962077546),
      (4,'NACHO LIBRE',1161648000,'Comedia', 99255460),
      (5,'LOS VIAJES DE GULIVER',1295481600,'Aventura-Comedia', 237382724),
      (6,'AMOR CIEGO',1014854400,'Comedia-Romance', 149270999),
      (7,'KING KONG',1133740800,'Aventura-Accion', 550517357),
      (8,'GOOSEBUMPS',1129334400,'Comedia-Terror', 158300000),
      (9,'SUPER MARIO BROS: LA PELICULA',1680739200,'Aventura-Animación', 1162418526),
      (10,'THE HOLIDAY',1168473600,'Comedia', 205100000)`
    );
    console.log("tabla peliculas cargada!");
  }

  if (!existeNominaciones) {
    // Creamos la tabla Nominacion
    await db.run(
      `CREATE table nominaciones(
        IdNominacion INTEGER PRIMARY KEY AUTOINCREMENT,
        NombrePremio text NOT NULL,
        TipoPremio text NOT NULL,
        Descripcion text NOT NULL,
        FechaNominacion INTEGER, 
        Resultado BOOLEAN NOT NULL
      );`
    );
    console.log("tabla Nominaciones creada!")
    // Inserción de valores iniciales
    await db.run(
      `INSERT INTO nominaciones VALUES
      (1, 'GOLDEN GLOBE', 'MOVIE', 'BERNIE', 1358095827, 0),
      (2, 'GOLDEN GLOBE', 'MOVIE', 'THE SCHOOL OF ROCK', 1074988800, 0),
      (3, 'MTV MOVIE AWARDS', 'MOVIE', 'THE SCHOOL OF ROCK', 1072958400, 1),
      (4, 'GRAMMY', 'SONG', 'THE LAST IN LINE', 1388577600, 1),
      (5, 'BEHIND THE VOICE ACTORS', 'MOVIE', 'KUNG FU PANDA 2', 1325419200, 1),
      (6, 'WALK OF FAME', 'SELF', 'MOTION PICTURES', 1537272000, 1),
      (7, 'MTV MOVIE + TV AWARDS', 'SELF', 'COMEDIC GENIUS', 1641038400, 1),
      (8, 'TEEN CHOICE', 'MOVIE', 'NACHO LIBRE', 1136116800, 0),
      (9, "PEOPLE'S CHOICE AWARDS, USA", 'SELF', 'FAVORITE FUNNY MALE  STAR', 1104580800, 0),
      (10, "CRITICS' CHOICE AWARDS", 'MOVIE', 'BERNIE', 1357041600, 1)`
    )
  
    console.log("tabla Nominaciones cargada!")
  }
  // cerrar la base
  db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;
