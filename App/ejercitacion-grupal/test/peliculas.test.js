const request = require("supertest");
const app = require("../index");

// FECHA PARA PRUEBAS
const fechaFormateada = 1621344000000;

const peliculaAlta = {
  Titulo: "Pelicula Prueba",
  FechaEstrenoArgentina: fechaFormateada,
  Genero: "Accion",
  Recaudacion: 672389475,
};

const peliculaModificacion = {
  id: 11,
  Titulo: "Cancion Prueba Modificada",
  FechaEstrenoArgentina: fechaFormateada,
  Genero: "Terror",
  Recaudacion: 123456789,
};


// test route/peliculas GET
describe("GET /api/peliculas", () => {
  it("Deberia devolver todas las peliculas", async () => {
    const res = await request(app).get("/api/peliculas");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdPelicula: expect.any(Number),
          Titulo: expect.any(String),
          FechaEstrenoArgentina: expect.any(Number),
          Genero: expect.any(String),
          Recaudacion: expect.any(Number),
        }),
      ])
    );
  });
});

// test route/articulos/:id GET
describe("GET /api/peliculas/:id", () => {
  it("Deberia devolver la pelicula con el id 1", async () => {
    const res = await request(app).get("/api/peliculas/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdPelicula: expect.any(Number),
        Titulo: expect.any(String),
        FechaEstrenoArgentina: expect.any(Number),
        Genero: expect.any(String),
        Recaudacion: expect.any(Number),
      })
    );
  });
});

// test route/peliculas POST
describe("POST /api/peliculas", () => {
  it("Deberia devolver la pelicula que acabo de crear", async () => {
    const res = await request(app).post("/api/peliculas").send(peliculaAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdPelicula: expect.any(Number),
        Titulo: expect.any(String),
        FechaEstrenoArgentina: expect.any(Number),
        Genero: expect.any(String),
        Recaudacion: expect.any(Number),
      })
    );
  });
});

// test route/peliculas/:id PUT
describe("PUT /api/peliculas/:id", () => {
  it("Deberia devolver el articulo con el id 11 modificado", async () => {
    const res = await request(app).put("/api/peliculas/11").send(peliculaModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/peliculas/:id DELETE
describe("DELETE /api/peliculas/:id", () => {
  it("Deberia devolver la pelicula con el id 11 borrado", async () => {
    const res = await request(app).delete("/api/peliculas/11");
    expect(res.statusCode).toEqual(200);
  });
});
