import { Router } from "express";
import customersRouter from "./customers.routes.js";
import rentRouter from "./jogos.routes.js";
import rentalsRouter from "./rentals.routes.js";


const router = Router()

router.use(rentRouter)
router.use(customersRouter)
router.use(rentalsRouter)

export default router