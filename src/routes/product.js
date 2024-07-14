import express from "express";
import {
    create,
    deletepro,
    getAll,
    getDetail,
    update,
} from "../controllers/product.js";
import { checkPermission } from "../middlewares/checkPermission.js";
const routerProduct = express.Router();
routerProduct.get("/", getAll);
routerProduct.get("/:id", getDetail);
routerProduct.post("/", checkPermission, create);
routerProduct.put("/:id", checkPermission, update);
routerProduct.delete("/:id", checkPermission, deletepro);
export default routerProduct;
