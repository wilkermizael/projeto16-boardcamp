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
            rentDate: dayjs().format('YYYY-MM-DD'),
            returnDate: null,
            originalPrice,
            delayFee: null   

        }
        
        // CONDIÇÃO CASO TENTE ALUGAR UM JOGO QUE EXCEDE A QUANTIDADE NO ESTOQUE
        const qtdStock = await db.query(`select r."gameId", g."id" AS "idGameStock", g."stockTotal"  from rentals r join games g on r."gameId" = g."id" WHERE g.id=$1;`,[gameId])
       // console.log(qtdStock.rows)
        
        
        if(qtdStock.rows.length > 0  && qtdStock.rows.length === qtdStock.rows[0].stockTotal) return res.sendStatus(400) 
        
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

export async function listRentals (req,res){
    
    try{
        const list = await db.query(`SELECT r.*, g."id" AS "idGame",g."name" AS "nameGame", c."id" AS "idCustomer", c."name" AS "nameCustomer"
         FROM rentals r
         JOIN customers c  on r."customerId" = c."id"
         JOIN games g on r."gameId" = g."id";`
         )

        const listObject = list.rows.map( item =>(
           {
               id: item.id,
               customerId:item.customerId,
               gameId:item.gameId,
               rentDate:dayjs(item.rentDate).format('YYYY-MM-DD'),
               daysRented: item.daysRented,
               returnDate: item.returnDate,
               originalPrice: item.originalPrice,
               delayFee: item.delayFee,
               customer:{
                   id:item.idCustomer,
                   name:item.nameCustomer
               },
               game:{
                   id:item.idGame,
                   name: item.nameGame
               }

            }
        ))
        res.status(201).send(listObject)
    }catch(error){
        res.status(500).send(error.message)
    }
   
}

export async function returnRentals(req, res){
    const {id} = req.params
    try{
        //VERIFICAR SE O ID DO ALUGUEL EXISTE
        const returnRent = await db.query(`SELECT * FROM rentals WHERE id=$1;`,[id])
        if(returnRent.rows.length === 0) return res.sendStatus(404)
        //VERIFICA SE O FILME JA FOI DEVOLVIDO
        if(returnRent.rows[0].returnDate !== null) return res.sendStatus(400)
        
        //CALCULANDO OS DIAS QUE ATRASO
        const date = dayjs(returnRent.rows[0].rentDate).format('YYYY-MM-DD')
        //const date = dayjs().format('YYYY-MM-DD')
        const diffDate = Number(dayjs().diff(date, 'day'))
        
        
        if(diffDate > returnRent.rows[0].daysRented){//CASO TENHA ATRASO
            const delayFee = ((diffDate - returnRent.rows[0].daysRented)*returnRent.rows[0].originalPrice)/3 //PREÇO A PAGAR PELO ATRASO
            
            await db.query(`UPDATE rentals SET "returnDate"=$1, "delayFee"= $2 where id=$3;`,[dayjs().format('YYYY-MM-DD'), delayFee, id])
            return res.sendStatus(200)
        }
        await db.query(`UPDATE rentals SET "returnDate"=$1, "delayFee"= $2 where id=$3;`,[dayjs().format('YYYY-MM-DD'), 0, id])
        res.sendStatus(200)
        //ATUALIZANDO A TABELA DEPOIS DA ENTREGA DO JOGO
        
        
    }catch(error){
        res.status(500).send(error.message)
    }
    
}

export async function deleteRentals(req,res){
    const {id} = req.params
    try{
        //VERIFICANDO SE O ID EXISTE
        const returnRent = await db.query(`SELECT * FROM rentals WHERE id=$1;`,[id])
        if(returnRent.rows.length === 0) return res.sendStatus(404)

        //VERIFICA SE O FILME JA FOI FINALIZADO
        if(returnRent.rows[0].returnDate === null) return res.sendStatus(400) //SE NÃO ESTIVER FINALIZADO, STATUS 400

        //DELETAR O ALUGUEL
        await db.query(`DELETE FROM rentals WHERE id=$1;`,[id])
        res.sendStatus(200)
    }catch(error){
        res.status(500).send(error.message)
    }
}