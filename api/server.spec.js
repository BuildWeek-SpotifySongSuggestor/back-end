const supertest = require("supertest");

const server = require("./server.js");
const db = require("../data/dbConfig.js");

describe('server', () => {
  
  describe('GET /api/tracks/:search', () => {
    
    it("should return HTTP status code 200", () => {
      return supertest(server)
          .get("/api/tracks/love")
          .then(res => {
              expect(res.status).toBe(200);
          });
    });

    it("should return JSON", async () => {
      const res = await supertest(server).get("/");

      expect(res.type).toMatch(/json/i);
    });

  });

  describe('GET /api/tracks/:id/single', () => {
    
    it("should return HTTP status code 200", () => {
      return supertest(server)
          .get("/api/tracks/1irAliF0T8sLIOPJp6n7rU/single")
          .then(res => {
              expect(res.status).toBe(200);
          });
    });

    it("should return JSON", async () => {
      const res = await supertest(server).get("/");

      expect(res.type).toMatch(/json/i);
    });

  });

  describe('POST /api/tracks/recover', () => {
    
    it("should fail with code 500 if passed incorrect data", () => {
      return supertest(server)
          .post("/api/tracks/recover")
          .send({})
          .then(res => {
              expect(res.status).toBe(500);
          });
    });

    it("should return 200 when passed correct data", () => {
      return supertest(server)
          .post("/api/tracks/recover")
          .send({ ids: ["2374M0fQpWi3dLnB54qaLX", "1irAliF0T8sLIOPJp6n7rU"] })
          .then(res => {
              expect(res.status).toBe(200);
          });
    });

  });

  describe('POST /api/auth/register', () => {
    beforeEach(async () => {
      await db("users").truncate();
    });
    
    it("should fail with code 400 if passed incorrect data", () => {
      return supertest(server)
          .post("/api/auth/register")
          .send({})
          .then(res => {
              expect(res.status).toBe(400);
          });
    });

    it("should return 201 when passed correct data", () => {
      return supertest(server)
          .post("/api/auth/register")
          .send({ username: "test", password: "pass", email: "test@dummydata.com" })
          .then(res => {
              expect(res.status).toBe(201);
          });
    });
  
  });

  describe('POST /api/auth/login', () => {
    
    it("should return 200 when passed correct data", () => {
      return supertest(server)
          .post("/api/auth/login")
          .send({ username: "test", password: "pass" })
          .then(res => {
              expect(res.status).toBe(200);
              token = res.body.token;
          });
    });

    it("should fail with code 401 if passed incorrect data", () => {
        return supertest(server)
            .post("/api/auth/login")
            .send({ username: "tests", password: "passw" })
            .then(res => {
                expect(res.status).toBe(401);
            });
    });

  });

  describe('POST /api/favorites', () => {
        
    it("should fail with code 400 if passed incorrect data", () => {
      return supertest(server)
          .post("/api/favorites")
          .send({})
          .then(res => {
              expect(res.status).toBe(400);
          });
    });

    it("should return 201 when passed correct data", () => {
      return supertest(server)
          .post("/api/favorites")
          .send({ spotify_id: "2374M0fQpWi3dLnB54qaLX", user_id: 1 })
          .then(res => {
              expect(res.status).toBe(201);
          });
    });

  });
  
  describe('GET /api/favorites/:id', () => {
    
    it("should return HTTP status code 200", () => {
      return supertest(server)
          .get("/api/favorites/1")
          .then(res => {
              expect(res.status).toBe(200);
          });
    });

    it("should return JSON", async () => {
      const res = await supertest(server).get("/");

      expect(res.type).toMatch(/json/i);
    });

  });
  
  describe('PUT /api/favorites/:id', () => {
        
    it("should fail with code 400 if passed incorrect data", () => {
      return supertest(server)
          .put("/api/favorites/2")
          .send({})
          .then(res => {
              expect(res.status).toBe(400);
          });
    });
  
    it("should return 200 when passed correct data", () => {
      return supertest(server)
          .put("/api/favorites/4")
          .send({ spotify_id: "1irAliF0T8sLIOPJp6n7rU", user_id: 1 })
          .then(res => {
              expect(res.status).toBe(200);
          });
    });
  
  });
  
  describe('DELETE /api/favorites/:id', () => {
    it("should return HTTP status code 200", () => {
      return supertest(server)
          .delete("/api/favorites/8")
          .then(res => {
              expect(res.status).toBe(200);
          });
    });

    it("should return JSON", async () => {
      const res = await supertest(server).delete("/api/favorites/1");

      expect(res.type).toMatch(/json/i);
    });

  });

});