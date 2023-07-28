import { Router } from "express"
import { insertRentals } from "../controllers/rentals.controller.js"


const rentalsRouter = Router()

rentalsRouter.post('/rentals', insertRentals)

export default rentalsRouter