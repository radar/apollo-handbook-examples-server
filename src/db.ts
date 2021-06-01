import { SQLDataSource } from "datasource-sql";

class Database extends SQLDataSource {
  async createBook(title: string) {
    return await this.knex('books').insert({ title: title }).then(async bookIds => {
      return this.getBook(bookIds[0])
    })
  }

  async updateBookTitle(id: string, title: string) {
    await this.knex('books').where({ id }).update({ title });
    return this.getBook(id)
  }

  getBook(id: string | number) {
    return this.knex
      .select("*")
      .from("books")
      .where({id })
      .first()
  }

  getBooks() {
    return this.knex
      .select("*")
      .from("books")
  }

  getBooksByTitle(title: string) {
    return this.knex
      .select("*")
      .from("books")
      .where(this.knex.raw('title like :title', { title: `%${title}%` }))
  }

  getUser(username: string) {
    return this.knex
      .select("*")
      .from("users")
      .where(this.knex.raw('username = :username', { username }))
      .first()
  }
}

export default Database;
