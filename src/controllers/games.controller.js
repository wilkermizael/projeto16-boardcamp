import { db } from "../database/database.js"

export async function listGame(req, res){
    try{
        const games = await db.query(`SELECT * FROM games;`)
        res.status(200).send(games.rows)
    }catch(error){
        res.status(500).send(error.message)
    }
   
}

export async function insertGame (req,res){
    const newGame = req.body
   //console.log(newGame.pricePerDay)
    
    try{
        const gameData = await db.query(`SELECT * FROM games WHERE name =$1;`,[newGame.name])
        console.log(gameData.rows)
        if(gameData.rows.length === 0){
            await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay")
            VALUES ($1, $2, $3, $4);`
            ,[newGame.name, newGame.image, newGame.stockTotal,  newGame.pricePerDay]
            )
            return res.status(201)
        } 
        return res.sendStatus(409)
        
    }catch(error){
        res.status(500).send(error.message)
    }
}
