// import { db } from "../database/database.js"

// export async function validadeRentalSchema(req,res,next){
//     return ()=>{const {customerId, gameId, daysRented} = req.body //customerId: 1,gameId: 1,daysRented: 3
    
//     try{
//         //Validação dos dados do req.body
//         if(daysRented<=0) return res.sendStatus(400)
//         const customerValidate = await db.query(`SELECT * FROM customers WHERE id=$1;`,[customerId])
//         const gameValidate = await db.query(`SELECT * FROM games WHERE id=$1;`,[gameId])
//         if(customerValidate.rows.length === 0 || gameValidate.rows.length === 0) return res.sendStatus(400)

//     }catch(error){
//         res.status(500).send(error.message)
//     }
//     next()
//     }
// }