import { Router } from "express";
import rentRouter from "./jogos.routes.js";


const router = Router()

router.use(rentRouter)

export default router