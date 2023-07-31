import { db } from "../database/database.js";
import dayjs from "dayjs";

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
        
        if (!id) {
            const customers = await db.query(`SELECT * FROM customers;`);
            
            const formattedCustomers = customers.rows.map(item => {
              const birthday = dayjs(item.birthday).format('YYYY-MM-DD');
              // Excluindo a propriedade "birthday" do objeto individual
              delete item.birthday
              //const { birthday, ...customerWithoutBirthday } = item;
             
              // Retornando o objeto modificado
              //return { ...customerWithoutBirthday, birthday };
              return { ...item, birthday };
            });
            return res.status(201).send(formattedCustomers);
          }
        
        const customers = await db.query(`SELECT * FROM customers WHERE id =$1;`,[id])
        
        if(customers.rows.length === 0){
    
            return res.sendStatus(404)
        }else{
          
            const birthday = dayjs(customers.rows.birthday).format('YYYY-MM-DD');
            //const {birthday, ...itemFormatado} = customers.rows[0]
            delete customers.rows[0].birthday
            //return res.status(201).send({...itemFormatado, birthday})
            return res.status(201).send({...customers.rows[0], birthday})
        }
        
    }catch(error){
        res.status(500).send(error.message)
    }
}

export async function updateCustomers(req,res){
    const id = Number(req.params.id)
    const dataUpdate = req.body
    console.log(dataUpdate)
    

    try{
        const customer = await db.query(`SELECT * FROM customers WHERE cpf = $1;`,[dataUpdate.cpf])
        
        if(customer.rows[0].id !== Number(id)){
            return res.sendStatus(409)
           
        }
        await db.query(`UPDATE customers SET name = $1,phone = $2,cpf= $3, birthday= $4 where id= $5;`,
        [dataUpdate.name, dataUpdate.phone, dataUpdate.cpf, dayjs(dataUpdate.birthday).format('YYYY-MM-DD'), id]

        )
        res.sendStatus(200)
        
    }catch(error){
        res.status(500).send(error.message)
    }
}