const request = require("supertest");
const app = require("../index");

describe("GET /api/socios", () => {
  it("Deberia devolver todos los socios", async () => {
    const res = await request(app).get("/api/socios");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdSocio: expect.any(Number),
          ApeNomSocio: expect.any(String),
          NroSocio: expect.any(Number),
        }),
      ])
    );
  });
});

describe("GET /api/socios?ApeNomSocio=Paula", () => {
  it("Deberia devolver los registros que contengan 'Paula'", async () => {
    const res = await request(app).get("/api/socios?ApeNomSocio=Paula");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdSocio: 26,
          ApeNomSocio: "MORA PAULA",
          NroSocio: 1025,
        }),
      ])
    );
  });
});
