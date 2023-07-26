import { Router } from "express"
import { insertGame, listGame } from "../controllers/alugueis.controller.js"

const rentRouter = Router()

rentRouter.get('/games', listGame)
rentRouter.post('/games',insertGame)

export default rentRouter