import express from "express";
import { getAll, getDetail } from "../controllers/product.js";
const routerProduct = express.Router();
routerProduct.get("/", getAll);
routerProduct.get("/:id", getDetail);
export default routerProduct;
