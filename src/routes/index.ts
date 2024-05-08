import { Router } from "express";
import booksRouter from './BookRoutes'

const routes = Router()

routes.use(booksRouter)

export default routes