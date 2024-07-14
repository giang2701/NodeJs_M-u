import express from "express";
import routerProduct from "./product.js";
import routerAuth from "./auth.js";
const router = express.Router();
router.use("/auth", routerAuth);
router.use("/product", routerProduct);
export default router;
