import { ApolloServer } from "apollo-server";
import { Resolvers, Book } from "../src/generated/graphql";
import Database from "./db";
const typeDefs = require("./schema.js")

const resolvers: Resolvers = {
  UserResult: {
    __resolveType: (object, info, context) => {
      if (object.__typename === "SuspendedUser") {
        return "SuspendedUser"
      } else {
        return "User"
      }
    }
  },
  Query: {
    books: (root, args, { dataSources }): Book[] => {
      return dataSources.db.getBooks();
    },
    book: (root, args, { dataSources }): Book => {
      return dataSources.db.getBook(args.id)
    },
    booksWithTitle: (_root, args, { dataSources }) => {
      return dataSources.db.getBooksByTitle(args.title)
    },
    user: async (root, args, { dataSources }) => {
      return dataSources.db.getUser(args.username)
    }
  },
  Mutation: {
    createBook: async (root, args, { dataSources }) => {
      return await dataSources.db.createBook(args.title)
    },
    updateBookTitle: async (root, args, { dataSources }) => {
      return await dataSources.db.updateBookTitle(args.id, args.title)
    }
  }
};


const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "db.sqlite3",
  }
};

const db = new Database(knexConfig);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return { db }
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
