import { Router } from "express"
import { listGame, insertGame } from "../controllers/games.controller.js"
import { validadeSchema } from "../middlewares/validateSchema.js"
import schemaRegraGame from "../schema/game.schema.js"

const rentRouter = Router()

rentRouter.get('/games',listGame)
rentRouter.post('/games',validadeSchema(schemaRegraGame),insertGame)

export default rentRouter