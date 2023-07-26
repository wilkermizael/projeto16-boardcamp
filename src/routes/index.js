import { Router } from "express";
import rentRouter from "./alugueis.routes.js";

const router = Router()

router.use(rentRouter)

export default router