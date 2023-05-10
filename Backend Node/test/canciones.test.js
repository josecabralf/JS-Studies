const request = require("supertest");
const app = require("../index");

// FECHA PARA PRUEBAS
const fecha = new Date('2023-05-09');
const dia = fecha.getDate().toString().padStart(2, '0');
const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
const anio = fecha.getFullYear();

const fechaFormateada = anio + '-' + mes + '-' + dia;

const cancionAlta = {
  Nombre: "Cancion Prueba",
  FechaLanzamiento: fechaFormateada,
  Genero: "Rock Ligero",
  DuracionSeg: 105,
};

const cancionModificacion = {
  id: 11,
  Nombre: "Cancion Prueba Modificada",
  FechaLanzamiento: fechaFormateada,
  Genero: "Rock",
  DuracionSeg: 105,
};


// test route/canciones GET
describe("GET /api/canciones", () => {
  it("Deberia devolver todas las canciones", async () => {
    const res = await request(app).get("/api/canciones");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdCancion: expect.any(Number),
          Nombre: expect.any(String),
          FechaLanzamiento: expect.any(String),
          Genero: expect.any(String),
          DuracionSeg: expect.any(Number),
        }),
      ])
    );
  });
});

// test route/articulos/:id GET
describe("GET /api/canciones/:id", () => {
  it("Deberia devolver la cancion con el id 1", async () => {
    const res = await request(app).get("/api/canciones/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdCancion: expect.any(Number),
        Nombre: expect.any(String),
        FechaLanzamiento: expect.any(String),
        Genero: expect.any(String),
        DuracionSeg: expect.any(Number),
      })
    );
  });
});

// test route/canciones POST
describe("POST /api/canciones", () => {
  it("Deberia devolver la cancion que acabo de crear", async () => {
    const res = await request(app).post("/api/canciones").send(cancionAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdCancion: expect.any(Number),
        Nombre: expect.any(String),
        FechaLanzamiento: expect.any(String),
        Genero: expect.any(String),
        DuracionSeg: expect.any(Number),
      })
    );
  });
});

// test route/canciones/:id PUT
describe("PUT /api/canciones/:id", () => {
  it("Deberia devolver el articulo con el id 11 modificado", async () => {
    const res = await request(app).put("/api/canciones/11").send(cancionModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/canciones/:id DELETE
describe("DELETE /api/canciones/:id", () => {
  it("Deberia devolver la cancion con el id 11 borrado", async () => {
    const res = await request(app).delete("/api/canciones/11");
    expect(res.statusCode).toEqual(200);
  });
});
