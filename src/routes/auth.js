import express from "express";
import { singIn, singUp } from "../controllers/auth.js";
const routerAuth = express.Router();
routerAuth.post("/singup", singUp);
routerAuth.post("/singin", singIn);
export default routerAuth;
