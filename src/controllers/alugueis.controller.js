import { db } from "../database/database.js"

export async function listGame(req, res){
    try{
        const games = await db.query(`SELECT * FROM games;`)
        res.status(200).send(games.rows[0])
    }catch(error){
        res.status(500).send(error.message)
    }
}

export async function insertGame (req,res){
    const newGame = req.body
   //console.log(newGame.pricePerDay)

    try{
       await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay")
        VALUES ($1, $2, $3, $4);`
        ,[newGame.name, newGame.image, newGame.stockTotal,  newGame.pricePerDay]
        )
        res.status(201)
    }catch(error){
        res.status(500).send(error.message)
    }
}