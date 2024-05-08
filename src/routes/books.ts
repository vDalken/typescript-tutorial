import { Router } from 'express'
import { createBookSchema } from '../validation_schemas/createBook'
import { checkSchema } from 'express-validator'
import { bookController } from '../controllers/BookController'

const router = Router()

router.get('/books', bookController.getAllBooks)

router.post('/books', checkSchema(createBookSchema), bookController.createBook)

router.get('/books/:id', bookController.getSpecificBook)

router.put(
  '/books/:id',
  checkSchema(createBookSchema),
  bookController.updateBook
)

router.delete('/books/:id', bookController.deleteBook)

export default router
