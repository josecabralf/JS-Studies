const request = require("supertest");
const app = require("../index");

// FECHA PARA PRUEBAS
const fechaFormateada = 1621344000000;

const nominacionAlta = {
  NombrePremio: "Nominacion Prueba",
  TipoPremio: "Premio prueba",
  Descripcion: "nom prueba",
  FechaNominacion: fechaFormateada,
  Resultado: false,
};

const nominacionModificada = {
  id: 11,
  NombrePremio: "Nominacion Prueba Modificada",
  TipoPremio: "Premio prueba modificado",
  Descripcion: "nom prueba mod",
  FechaNominacion: fechaFormateada,
  Resultado: true,
};

// Testing GET from routes/nominaciones
describe("GET /api/nominaciones", () => {
  it("Deberia devolver todas las nominaciones", async () => {
    const res = await request(app).get("/api/nominaciones");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdNominacion: expect.any(Number),
          NombrePremio: expect.any(String),
          TipoPremio: expect.any(String),
          Descripcion: expect.any(String),
          FechaNominacion: expect.any(Number),
          Resultado: expect.any(Boolean)
        }),
      ])
    );
  });
});

// Testing GET from routes/nominaciones/:id
describe("GET /api/nominaciones/:id", () => {
  it("Deberia devolver la nominación con el id 1", async () => {
    const res = await request(app).get("/api/nominaciones/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdNominacion: expect.any(Number),
        NombrePremio: expect.any(String),
        TipoPremio: expect.any(String),
        Descripcion: expect.any(String),
        FechaNominacion: expect.any(Number),
        Resultado: expect.any(Boolean)
      })
    );
  });
});

// Testing POST from routes/nominaciones
describe("POST /api/nominaciones", () => {
  it("Deberia devolver la nominacion que acabo de crear", async () => {
    const res = await request(app).post("/api/nominaciones").send(nominacionAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdNominacion: expect.any(Number),
        NombrePremio: expect.any(String),
        TipoPremio: expect.any(String),
        Descripcion: expect.any(String),
        FechaNominacion: expect.any(Number),
        Resultado: expect.any(Boolean),
      })
    );
  });
});

// Testing PUT from routes/nominaciones/:id
describe("PUT /api/nominaciones/:id", () => {
  it("Deberia devolver la nominación con el id 1 modificada", async () => {
    const res = await request(app).put("/api/nominaciones/1").send(nominacionModificada);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/canciones/:id DELETE
describe("DELETE /api/nominaciones/:id", () => {
  it("Deberia devolver la nominación con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/nominaciones/1");
    expect(res.statusCode).toEqual(200);
  });
});
