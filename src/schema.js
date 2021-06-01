const schema = `
  type Query {
    books: [Book!]!
    book(id: ID!): Book!
    booksWithTitle(title: String!): [Book!]!
    user(username: String!): UserResult!
  }

  union UserResult = User | SuspendedUser

  type User {
    id: ID!
    username: String!
  }

  type SuspendedUser {
    id: ID!
    username: String!
    suspensionReason: String!
  }

  type Book {
    id: ID!
    title: String!
  }

  type Mutation {
    createBook(title: String!): Book!
    updateBookTitle(id: ID!, title: String!): Book!
  }
`

module.exports = schema
