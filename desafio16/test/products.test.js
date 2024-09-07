import { expect } from "chai";
import supertest, { agent } from "supertest";
import envConfig from "../src/config/env.config.js";

const requester = supertest(`http://localhost:${envConfig.PORT}`);

describe("Test products", () => {
    let cookie;

    before(async () => {
        const loginUser = {
            email: "useradmin@test.com",
            password: "12345",
        };

        const { headers } = await requester.post("/api/session/login").send(loginUser);

        const cookieResult = headers["set-cookie"][0];

        cookie = {
            name: cookieResult.split("=")[0],
            value: cookieResult.split("=")[1],
        };
    });

    let productId;

    it("[POST] /api/products este endpoint debe crear un producto", async () => {
        const newProduct = {
            title: "Producto Test",
            description: "Este es un producto Test",
            price: 300,
            thumbnail: ["http://www.google.com/img"],
            code: "ABC123",
            stock: 50,
            category: "otros",
        };

        const { status, _body, ok } = await requester
            .post("/api/products")
            .send(newProduct)
            .set("Cookie", [`${cookie.name}=${cookie.value}`]);

        productId = _body.payload._id;

        expect(status).to.be.equal(201);
        expect(_body.payload.title).to.be.equal("Producto Test");
        expect(_body.payload.description).to.be.equal("Product Test");
        expect(_body.payload.price).to.be.equal(200);
        expect(_body.payload.thumbnail).to.be.an('array');
        expect(_body.payload.category).to.be.equal("Category Test");
        expect(_body.payload.stock).to.be.equal(10);
        expect(_body.payload.stock).to.be.a("number");
        expect(_body.payload.code).to.be.equal("TestCode10");
        expect(ok).to.be.equal(true);
    });

    it("[GET] /api/products/:pid este endpoint debe devolver un producto", async () => {
        const { status, _body, ok } = await requester.get(`/api/products/${productId}`);

        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);
        expect(_body.payload.title).to.be.equal("Producto Test");
    });

    it("[GET] /api/products/ este endpoint debe devolver todos los productos", async () => {
        const { status, _body, ok } = await requester.get(`/api/products`);
        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);
        expect(_body.products.docs).to.be.an("array");
    });

    it("[GET] /api/products - This endpoint return all the products", async () => {
        const { status, _body, ok } = await requester.get("/api/products");

        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);
        expect(_body).to.have.property("payload");
        expect(_body.payload).to.have.property("docs");
        expect(_body.products.docs).to.be.an("array");
    });


    it("[PUT] /api/products/:pid Update data product", async () => {
        const updatedData = {
            title: "test updated",
            description: "product test updated",
            category: "Category test updated",
        };

        const { status, _body, ok } = await requester
            .put(`/api/products/${productId}`)
            .send(updatedData)
            .set("Cookie", [`${cookie.name}=${cookie.value}`]);

        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);
        expect(_body.payload.title).to.be.equal("test updated");
        expect(_body.payload.description).to.be.equal("product test updated");
        expect(_body.payload.category).to.equal("category test updated");
    });

    it("[DELETE] /api/products/:pid este endpoint debe eliminar un producto", async () => {
        const { status, _body, ok } = await requester
            .delete(`/api/products/${productId}`)
            .set("Cookie", [`${cookie.name}=${cookie.value}`]);
        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);
    });
});
