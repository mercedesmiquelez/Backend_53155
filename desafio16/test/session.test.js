import { expect } from "chai";
import supertest from "supertest";
import envConfig from "../src/config/env.config.js";
import mongoose from "mongoose";
import { userModel } from "../src/persistences/mongo/models/user.model.js";

mongoose.connect(envConfig.MONGO_URL); //conectamos con mongo y vamos a importar directamente el modelo de usuario

const requester = supertest(`http://localhost:${envConfig.PORT}`); //aqui tenemos supertest que va a hacer las peticiones (indico la URL base)

describe("Test de session", () => {
    it("[POST] /api/session/register  This endpoint should register a user", async () => { //se determina que tipo de peticion se va a hacer [post] en este caso
        const newUser = { //creamos el usuario
            first_name: "User test",
            last_name: "Test",
            email: "user-test@test.com",
            password: "123",
            age: 20,
            role: "user"
        };

        const { status, _body, ok } = await requester.post("/api/session/register").send(newUser);

        expect(status).to.be.equal(201); //status 201 de creacion
        expect(ok).to.be.equal(true); //si nos devuelve un false es que algo fallo
        expect(_body.status).to.be.equal("success");
    });

    let cookie;

    it("[POST] /api/session/login this endpoint should register a user", async () => {
        const loginUser = {
            email: "user-test@test.com",
            password: "123",
        };

        const { status, _body, ok, headers } = await requester.post("/api/session/login").send(loginUser);
        const cookieResult = headers["set-cookie"][0];

        cookie = {
            name: cookieResult.split("=")[0],
            value: cookieResult.split("=")[1],
        };

        expect(ok).to.be.equal(true);
        expect(status).to.be.equal(200);
        expect(_body.payload.first_name).to.be.equal("User test");
        expect(_body.payload.email).to.be.equal("user-test@test.com");
        expect(_body.payload.role).to.be.equal("user");


        const loginAdmin = {
            email: "admin-test@test.com",
            password: "123"
        };

        const { status: statusAdmin, _body: _bodyAdmin, ok: okAdmin, headers: headersAdmin } = await requester
            .post("/api/sessions/login")
            .send(loginAdmin);
        
        const cookieResultAdmin = headersAdmin["set-cookie"][0];
        cookieAdmin = {
            name: cookieResultAdmin.split("=")[0],
            value: cookieResultAdmin.split("=")[1],
        }

        expect(statusAdmin).to.be.equal(200);
        expect(okAdmin).to.be.equal(true);
        expect(_bodyAdmin.status).to.be.equal("success");
        expect(_bodyAdmin.payload.firstName).to.be.equal("Admin test");
        expect(_bodyAdmin.payload.email).to.be.equal("admin-test@test.com");
        expect(_bodyAdmin.payload.role).to.be.equal("admin");

    });

    it("[GET] /api/session/current this endpoint shows the user information", async () => {
        const { status, _body, ok } = await requester
            .get("/api/session/current")
            .set("Cookie", [`${cookie.name}=${cookie.value}`]);

        expect(ok).to.be.equal(true);
        expect(status).to.be.equal(200);
        expect(_body.payload.email).to.be.equal("user-test@test.com");
        expect(_body.payload.role).to.be.equal("user");
    });

    after(async () => {
        await userModel.deleteOne({ email: "user-test@test.com" });
        await userModel.deleteOne({ email: "admin-test@test.com" });
        mongoose.disconnect(); //Cierra la conexion de la base de datos
    });
});
