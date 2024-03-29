import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from 'uuid';
import { app } from "../../../../shared/infra/http/app";

import createConnection from "../../../../shared/infra/typeorm";

let connection: Connection;

describe("List Category Controller", () => {

  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);


    await connection.query(
      `INSERT INTO USERS(id, name, email, password, username, "isAdmin", created_at, driver_lincense)
        VALUES( '${id}', 'admin','admin@rentx.com.br','${password}', 'admin', true, 'now()', 'XXXXXXX')
        `
    );

    await connection.query(
      `INSERT INTO categories(id, name, description,  created_at)
        VALUES( '${id}', 'categoryTeste','testecategoria', 'now()')
        `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to list all categories", async () => {

    const responseToken = await request(app)
      .post("/sessions")
      .send({
        "username": "admin",
        "password": "admin"
      });

    const { refresh_token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        "name": "Category SuperTest",
        "description": "Teste de integração Create Category"
      })
      .set({
        Authorization: `Bearer ${refresh_token}`
      });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

});