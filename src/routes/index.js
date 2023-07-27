import { Router } from "express";
import customersRouter from "./customers.routes.js";
import rentRouter from "./jogos.routes.js";


const router = Router()

router.use(rentRouter)
router.use(customersRouter)

export default router