import database from '../src/models'

class BookService {
  static async getAllBooks() {
    try {
      return await database.Book.findAll()
    } catch (err) { throw err }
  }

  static async addBook(newBook) {
    try {
      return await database.Book.create(newBook)
    } catch (err) { throw err }
  }

  static async updateBook(id, updateBook) {
    try {
      const bookToUpdate = await database.Book.findOne({
        where: { id: Number(id) }
      })

      if (bookToUpdate) {
        await database.Book.update(updateBook, {
          where: { id: Number(id) }
        })
        return updateBook
      }
      return null
    } catch (err) {
      throw err
    }
  }

  static async getABook(id) {
    try {
      const theBook = await database.Book.findOne({
        where: { id: Number(id) }
      })
      return theBook
    } catch (err) {
      throw err
    }
  }

  static async deleteBook(id) {
    try {
      const bookToDelete = await database.Book.findOne({
        where: { id: Number(id) }
      })

      if (bookToDelete) {
        const deletedBook = await database.Book.destroy({
          where: { id: Number(id) }
        })
        return deletedBook
      }
      return null
    } catch (err) {
      throw err
    }
  }
}

export default BookService