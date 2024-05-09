import 'reflect-metadata'
import express from 'express'
import routes from './routes/index'
import dotenv from 'dotenv'
import { Book } from './models/Book'
import { AppDataSource } from './app-data-source'

dotenv.config()

const port = process.env.PORT

AppDataSource.initialize()
  .then(() => {
    console.log('Database was connected successfully')
  })
  .catch((error) => console.log(`Error connecting to database: ${error}`))

const app = express()
app.use(express.json())
app.use(routes)

export const bookRepository = AppDataSource.getRepository(Book)

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`)
})
