import { DataSource } from "typeorm"
import { Book } from "./models/Book"

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '090712',
    database: 'typeorm_db',
    entities: [Book],
    synchronize: true
  })