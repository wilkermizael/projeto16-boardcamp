import { Router } from "express"
import { insertRentals, listRentals } from "../controllers/rentals.controller.js"


const rentalsRouter = Router()

rentalsRouter.post('/rentals', insertRentals)
rentalsRouter.get('/rentals', listRentals)

export default rentalsRouter