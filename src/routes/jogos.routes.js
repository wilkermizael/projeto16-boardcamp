import { Router } from "express"
import { listGame, insertGame } from "../controllers/jogos.controller.js"

const rentRouter = Router()

rentRouter.get('/games', listGame)
rentRouter.post('/games',insertGame)

export default rentRouter