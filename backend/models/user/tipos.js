import { gql } from 'apollo-server-express';

const tiposUsuario = gql`
  type Usuario {
    _id: ID!
    idUsuario: String!
    email: String!
    nombre: String!
    rol: Enum_Rol!
    estado: Enum_EstadoUsuario
  }
  type Query {
    Usuarios: [Usuario]
    Usuario(_id: String!): Usuario
  }
  type Mutation {
    crearUsuario(
      email: String!
      idUsuario: String!
      nombre: String!
      clave: String!
      rol: Enum_Rol!
      estado: Enum_EstadoUsuario
    ): Usuario
    editarUsuario(
      _id: String!
      email: String
      idUsuario: String
      nombre: String
      estado: Enum_EstadoUsuario
    ): Usuario
    eliminarUsuario(idUsuario: String, email: String): Usuario
  }
`;

export { tiposUsuario };