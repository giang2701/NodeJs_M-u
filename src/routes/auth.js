import express from "express";
import { singUp } from "../controllers/auth.js";
const routerAuth = express.Router();
routerAuth.post("/singup", singUp);
export default routerAuth;
