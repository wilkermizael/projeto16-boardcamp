import { Router } from "express";
import insertCustomers from "../controllers/customers.controller.js";

const customersRouter = Router()

customersRouter.post('/customers', insertCustomers)

export default customersRouter