import { Router } from "express"
import { insertRentals, listRentals, returnRentals } from "../controllers/rentals.controller.js"


const rentalsRouter = Router()

rentalsRouter.post('/rentals', insertRentals)
rentalsRouter.get('/rentals', listRentals)
rentalsRouter.post('/rentals/:id/return', returnRentals)

export default rentalsRouter