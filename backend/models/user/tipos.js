import { gql } from 'apollo-server-express';

const tiposUsuario = gql`
  type Usuario {
    _id: ID
    idUsuario: String!
    email: String!
    nombre: String!
    rol: Enum_Rol!
    estado: Enum_EstadoUsuario
  }
  type Query {
    Usuarios(_id: ID!): [Usuario]
    Usuario(_id: ID!, usuario:ID!): Usuario
  }
  type Mutation {
    crearUsuario(
      email: String!
      idUsuario: String!
      nombre: String!
      clave: String!
      rol: Enum_Rol!
    ): Usuario
    cambiarEstado(_id: ID!, usuario:ID!, estado: Enum_EstadoUsuario!): String
    editarUsuario(
      _id: String!
      usuario:String!
      email: String
      idUsuario: String
      nombre: String
    ): Usuario
    eliminarUsuario(_id: ID!, email: String): String
  }
`;

export { tiposUsuario };