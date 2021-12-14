import { gql } from '@apollo/client';

const REGISTRO = gql`
  mutation Registro(
    $nombre: String!
    $idUsuario: String!
    $email: String!
    $rol: Enum_Rol!
    $clave: String!
  ) {
    registro(
      nombre: $nombre
      idUsuario: $idUsuario
      email: $email
      rol: $rol
      clave: $clave
    ) {
      token
      error
    }
  }
`;

const LOGIN = gql`
  mutation Login($email: String!, $clave: String!) {
    login(email: $email, clave: $clave) {
      token
      error
    }
  }
`;

const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      token
      error
    }
  }
`;

export { REGISTRO, LOGIN, REFRESH_TOKEN };
