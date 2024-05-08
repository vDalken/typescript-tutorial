import express, {Express} from 'express'
import routes from './routes/index'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT
const app : Express = express()

app.use(express.json())
app.use(routes)

app.listen(port, () =>{
    console.log(`Running at http://localhost:${port}`)
})
