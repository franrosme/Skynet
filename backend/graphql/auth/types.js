import { gql } from 'apollo-server-express';

const tiposAutenticacion = gql`
  type Token {
    token: String
    error: String
  }

  type Mutation {
    registro(
      nombre: String!
      idUsuario: String!
      email: String!
      rol: Enum_Rol!
      estado: Enum_EstadoUsuario
      clave: String!
    ): Token!

    login(email: String!, clave: String!): Token

    refreshToken: Token
  }
`;

export { tiposAutenticacion };