import { expect } from "chai";
import supertest from "supertest";
import envConfig from "../src/config/env.config.js";
import mongoose from "mongoose";

mongoose.connect(envConfig.MONGO_URL);

const requester = supertest(`http://localhost:${envConfig.PORT}`);

describe("Carts Tests", () => { 
    let cookie;
    let userCartId;
    let userProductId
    before(async () => {
        //Login de usuario
        const loginUser = {
            email: "usuario2@test.com",
            password: "12345",
        };
        
        const { _body, headers } = await requester.post("/api/sessions/login").send(loginUser);
        userCartId = _body.payload.cart;

        const cookieResult = headers["set-cookie"][0];
        cookie = {
            name: cookieResult.split("=")[0],
            value: cookieResult.split("=")[1],
        };
        //Login de usuario premium
        const loginPremium = {
            email: "usuario3@test.com",
            password: "12345",
        };

        const { _body: _bodyPremium, headers: headersPremium } = await requester.post("/api/sessions/login").send(loginPremium);
        cartIdPremium = _bodyPremium.payload.cart;

        const cookieResultPremium = headersPremium["set-cookie"][0];
        cookiePremium = {
            name: cookieResultPremium.split("=")[0],
            value: cookieResultPremium.split("=")[1],
        };

        //Producto a agregar al carrito
        const { _body: _bodyProduct } = await requester.get(`/api/products/`)
        userProductId = _bodyProduct.products.docs[0]._id;
    })
    
    
    it("[GET] /api/carts/:cid - This endpoint should return a cart", async () => {

        const { status, _body, ok } = await requester.get(`/api/carts/${userCartId}`).set("Cookie", [`${cookie.name}=${cookie.value}`]);
        
        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);
        expect(_body.status).to.be.equal("success");
        expect(_body.payload._id).to.be.equal(userCartId);
        expect(_body.payload.products).to.be.an("array");

        const { status: statusPremium, _body: _bodyPremium, ok: okPremium } = await requester.get(`/api/carts/${cartIdPremium}`).set("Cookie", [`${cookiePremium.name}=${cookiePremium.value}`]);

        expect(statusPremium).to.be.equal(200);
        expect(okPremium).to.be.equal(true);
        expect(_bodyPremium.status).to.be.equal("success");
        expect(_bodyPremium.payload._id).to.be.equal(cartIdPremium);
        expect(_bodyPremium.payload.products).to.be.an("array");
    });

    it("[POST] /api/carts/:cid/product/:pid - This endpoint should add a product to a cart", async () => {

        const { status, _body, ok } = await requester.post(`/api/carts/${userCartId}/product/${userProductId}`).set("Cookie", [`${cookie.name}=${cookie.value}`]);

        expect(status).to.be.equal(200);
    });
});