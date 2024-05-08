import { Request, Response } from 'express'
import { books } from '../data/data'
import { Book } from '../data/data'
import { validationResult, checkSchema, matchedData } from 'express-validator'

export const bookController = {
  getAllBooks: (request: Request, response: Response) => {
    if (books.length === 0) {
      return response.status(404).send({ msg: 'No books posted yet' })
    }
    return response.send(books)
  },

  createBook: (request: Request, response: Response) => {
    const result = validationResult(request)

    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() })

    const { title, author, pages } = matchedData(request)

    const book: Book = {
      id: books.length,
      title: title,
      author: author,
      pages: pages
    }

    books.push(book)

    return response.status(200).send(book)
  },

  getSpecificBook: (request: Request, response: Response) => {
    const {
      params: { id }
    } = request

    const book = books.find((book) => book.id === parseInt(id))

    if (!book) {
      response.status(404).send({ msg: 'No book with that id found' })
    }

    return response.status(200).send(book)
  },

  updateBook: (request: Request, response: Response) => {
    const result = validationResult(request)

    if (!result.isEmpty()) {
      return response.status(400).send({ errors: result.array() })
    }

    const { title, author, pages } = matchedData(request)

    const bookIndex = books.findIndex(
      (book) => book.id === parseInt(request.params.id)
    )
    console.log(bookIndex)

    if (bookIndex === -1) {
      return response
        .status(400)
        .send({ msg: 'There is no such book with that id' })
    }

    const newBook = {
      id: bookIndex,
      title: title,
      author: author,
      pages: pages
    }

    books[bookIndex] = newBook

    return response.status(200).send(newBook)
  },

  deleteBook: (request: Request, response: Response) => {
    const {
      params: { id }
    } = request
  
    const bookIndex = books.findIndex((book) => book.id === parseInt(id))
  
    if (bookIndex === -1) {
      return response.status(400).send({ msg: 'No book with that id was found' })
    }
  
    books.splice(bookIndex, 1)
  
    return response.sendStatus(204)
  }
}
