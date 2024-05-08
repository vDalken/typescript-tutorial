import 'reflect-metadata'
import express, { Express } from 'express'
import routes from './routes/index'
import dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { Book } from './models/Book'

dotenv.config()

const port = process.env.PORT
const app: Express = express()

app.use(express.json())
app.use(routes)

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '090712',
  database: 'typeorm_db',
  entities: [Book],
  synchronize: true
})

AppDataSource.initialize()
  .then(() => {
    console.log('Database was connected successfully')
  })
  .catch((error) => console.log(`Error connecting to database: ${error}`))

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`)
})
