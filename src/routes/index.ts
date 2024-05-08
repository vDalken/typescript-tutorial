import { Router } from "express";
import booksRouter from './books'

const routes = Router()

routes.use(booksRouter)

export default routes