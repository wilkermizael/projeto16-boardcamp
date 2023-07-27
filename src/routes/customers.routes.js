import { Router } from "express";
import {insertCustomers, listCustomers, updateCustomers } from "../controllers/customers.controller.js";
import { validadeSchema } from "../middlewares/validateSchema.js";
import schemaCustomers from "../schema/customers.schema.js";

const customersRouter = Router()

customersRouter.post('/customers',validadeSchema(schemaCustomers) ,insertCustomers)
customersRouter.get('/customers',listCustomers)
customersRouter.get('/customers/:id',listCustomers)
customersRouter.put('/customers/:id',validadeSchema(schemaCustomers),updateCustomers)

export default customersRouter