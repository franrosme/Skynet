import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import conectarBD from './database/connection.js';
import { types } from './graphql/types.js';
import { resolvers } from './graphql/resolver.js';

dotenv.config();

const server = new ApolloServer({
  typeDefs: types,
  resolvers: resolvers,
});

const app = express();

app.use(express.json());

app.use(cors());

app.listen({ port: process.env.PORT || 4000 }, async () => {
  await conectarBD();
  await server.start();

  server.applyMiddleware({ app });

  console.log('servidor listo');
});