import { db } from "../database/database.js";

export async function insertCustomers (req, res){
    const dataClients = req.body
    
    try{
        const findCpf = await db.query(`SELECT * FROM customers WHERE cpf = $1;`,[dataClients.cpf])
        if(findCpf.rows.length === 0){
            await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`
            ,[dataClients.name, dataClients.phone, dataClients.cpf, dataClients.birthday])
            return res.sendStatus(201)
        }
        return res.sendStatus(409)
       
    }catch(error){
        res.status(500).send(error.message)
    }
} 

export async function listCustomers(req,res){
    const {id} = req.params

    try{
        
        if(!id){
            const customers = await db.query(`SELECT * FROM customers;`)
            return res.status(201).send(customers.rows)
        
        }
        
        const customers = await db.query(`SELECT * FROM customers WHERE id =$1;`,[id])
        
        if(customers.rows.length === 0){
    
            return res.sendStatus(404)
        }else{
            return res.status(201).send(customers.rows)
        }
        
    }catch(error){
        res.status(500).send(error.message)
    }
}

export async function updateCustomers(req,res){
    const {id} = req.params
    const dataUpdate = req.body
    

    try{
        const customer = await db.query(`SELECT * FROM customers WHERE cpf = $1;`,[dataUpdate.cpf])
       
        if(customer.rows[0].id !== Number(id)){
            return res.sendStatus(409)
           
        }
        await db.query(`UPDATE customers SET name = $1,phone = $2,cpf= $3, birthday= $4 where id= $5;`,
        [dataUpdate.name, dataUpdate.phone, dataUpdate.cpf, dataUpdate.birthday, id]

        )
        res.sendStatus(201)
        
    }catch(error){
        res.status(500).send(error.message)
    }
}