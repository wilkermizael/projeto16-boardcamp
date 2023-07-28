import { db } from "../database/database.js";
import dayjs from "dayjs";

export async function insertRentals (req,res){
     const {customerId, gameId, daysRented} = req.body //customerId: 1,gameId: 1,daysRented: 3
    
     try{
        //Validação dos dados do req.body
        if(daysRented<=0) return res.sendStatus(400)
        
        //CERTIFICANDO QUE O CLIENTE E O JOGO EXISTEM
        const customer_game_validate = await db.query(`SELECT * FROM customers c CROSS JOIN games g WHERE c.id=$1 and g.id=$2;`,[customerId,gameId])
        if(customer_game_validate.rows.length === 0) return res.sendStatus(400)
        
        // MONTANDO UM ARRAY COM OS DADOS VALIDADOS E PREENCHIDOS
        let originalPrice = daysRented * customer_game_validate.rows[0].pricePerDay
        
        const dataRent = {
            ...req.body,
            rentDate: dayjs().toString(),
            returnDate: null,
            originalPrice,
            delayFee: null   

        }
        
        // CONDIÇÃO CASO TENTE ALUGAR UM JOGO QUE EXCEDE A QUANTIDADE NO ESTOQUE
        const qtdStock = await db.query(`select r."gameId", g."id" AS "idGameStock", g."stockTotal"  from rentals r join games g on r."gameId" = g."id" WHERE g.id=$1;`,[gameId])
        if(qtdStock.rows.length === qtdStock.rows[0].stockTotal) return res.sendStatus(400) 
        
        // INSERINDO UM ALUGUEL
        await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate","daysRented", "returnDate", "originalPrice", "delayFee"  )
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        ;`, 
        [dataRent.customerId, dataRent.gameId, dataRent.rentDate, dataRent.daysRented, dataRent.returnDate ,dataRent.originalPrice, dataRent.delayFee])
        return res.sendStatus(201)
     }catch(error){
         res.status(500).send(error.message)
     }
     
}