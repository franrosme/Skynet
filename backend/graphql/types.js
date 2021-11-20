import { gql } from 'apollo-server-express';


export const types = gql`
type Usuario {
  _id: ID!
  idUsuario: String!
  email: String!
  nombre: String!
 }
type Query {
  Usuarios: [Usuario]
}

`