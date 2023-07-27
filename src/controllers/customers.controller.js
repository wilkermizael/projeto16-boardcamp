import { db } from "../database/database.js";

export default async function insertCustomers (req, res){
    const dataClients = req.body
    
    try{
        const findCpf = await db.query(`SELECT * FROM customers WHERE cpf = $1;`,[dataClients.cpf])
        if(findCpf.rows.length === 0){
            await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`
            ,[dataClients.name, dataClients.phone, dataClients.cpf, dataClients.birthday])
            return res.sendStatus(201)
        }
        //console.log(findCpf.rows)
        return res.sendStatus(409)
       
    }catch(error){
        res.status(500).send(error.message)
    }
} 