import express from "express";
import {
    create,
    deletepro,
    getAll,
    getDetail,
    update,
} from "../controllers/product.js";
const routerProduct = express.Router();
routerProduct.get("/", getAll);
routerProduct.get("/:id", getDetail);
routerProduct.post("/", create);
routerProduct.put("/:id", update);
routerProduct.delete("/:id", deletepro);
export default routerProduct;
