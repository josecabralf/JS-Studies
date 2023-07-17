const request = require("supertest");
const app = require("../index");

// FECHA PARA PRUEBAS
const fechaFormateada = 1621344000000;

const personajeAlta = {
  Nombre: "Personaje Prueba",
  FechaAparicion: fechaFormateada,
  Habilidad: "Cantante",
  VecesInterpretado: 2,
};

const personajeModificado = {
  id: 11,
  Nombre: "Personaje Modificado",
  FechaAparicion: fechaFormateada,
  Habilidad: "Abogado",
  VecesInterpretado: 5,
};




// test route/personajes/:id GET
describe("GET /api/personajes/:id", () => {
  it("Deberia devolver el personaje con el id 1", async () => {
    const res = await request(app).get("/api/personajes/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdPersonaje: expect.any(Number),
        Nombre: expect.any(String),
        FechaAparicion: expect.any(Number),
        Habilidad: expect.any(String),
        VecesInterpretado: expect.any(Number),
      })
    );
  });
});

// test route/personajes GET
describe("GET /api/personajes", () => {
  it("Deberia devolver todas los personajes", async () => {
    const res = await request(app).get("/api/personajes");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdPersonaje: expect.any(Number),
          Nombre: expect.any(String),
          FechaAparicion: expect.any(Number),
          Habilidad: expect.any(String),
          VecesInterpretado: expect.any(Number),
        }),
      ])
    );
  });
});

// test route/personajes POST
describe("POST /api/personajes", () => {
  it("Deberia devolver el personaje que acabo de crear", async () => {
    const res = await request(app).post("/api/personajes").send(personajeAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdPersonaje: expect.any(Number),
        Nombre: expect.any(String),
        FechaAparicion: expect.any(Number),
        Habilidad: expect.any(String),
        VecesInterpretado: expect.any(Number),
      })
    );
  });
});

// test route/personajes/:id PUT
describe("PUT /api/personajes/:id", () => {
  it("Deberia devolver el personaje con el id 11 modificado", async () => {
    const res = await request(app).put("/api/personajes/11").send(personajeModificado);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/personajes/:id DELETE
describe("DELETE /api/personajes/:id", () => {
  it("Deberia devolver el personaje con el id 11 borrado", async () => {
    const res = await request(app).delete("/api/personajes/11");
    expect(res.statusCode).toEqual(200);
  });
});