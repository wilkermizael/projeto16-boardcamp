import { Router } from "express"
import  { insertRentals, listRentals, returnRentals, deleteRentals } from "../controllers/rentals.controller.js"


const rentalsRouter = Router()

rentalsRouter.post('/rentals', insertRentals)
rentalsRouter.get('/rentals', listRentals)
rentalsRouter.post('/rentals/:id/return', returnRentals)
rentalsRouter.delete('/rentals/:id', deleteRentals)

export default rentalsRouter