import { Request, Response } from 'express'
import { Book } from '../models/Book'
import { validationResult, matchedData } from 'express-validator'
import { bookRepository } from '..'

export const bookController = {
  getAllBooks: async (request: Request, response: Response) => {
    const books = await bookRepository.find()
    return response.send(books)
  },

  createBook: async (request: Request, response: Response) => {
    const result = validationResult(request)

    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() })

    const { title, author, pages } = matchedData(request)

    const book = new Book()
    book.title = title
    book.author = author
    book.pages = pages

    const savedBook = await bookRepository.save(book)

    return response.status(200).send(savedBook)
  },

  getSpecificBook: async (request: Request, response: Response) => {
    const {
      params: { id }
    } = request

    const book = await bookRepository.findOne({
      where: {
        id: parseInt(id)
      }
    })

    if (!book) {
      return response.status(404).send({ msg: 'No book with that id found' })
    }

    return response.status(200).send(book)
  },

  updateBook: async (request: Request, response: Response) => {
    const result = validationResult(request)

    if (!result.isEmpty()) {
      return response.status(400).send({ errors: result.array() })
    }

    const { title, author, pages } = matchedData(request)
    const bookId: number = parseInt(request.params.id)

    const book = await bookRepository.findOne({ where: { id: bookId } })

    if (!book) {
      return response
        .status(400)
        .send({ msg: 'There is no such book with that id' })
    }

    book.title = title
    book.author = author
    book.pages = pages

    const savedBook = await bookRepository.save(book)

    return response.status(200).send(savedBook)
  },

  deleteBook: async (request: Request, response: Response) => {
    const {
      params: { id }
    } = request

    const bookId : number = parseInt(id)

    const book = await bookRepository.findOne({
      where:{
        id:bookId
      }
    })

    if (!book) {
      return response
        .status(400)
        .send({ msg: 'No book with that id was found' })
    }

    await bookRepository.delete(bookId);

    return response.sendStatus(204)
  }
}
