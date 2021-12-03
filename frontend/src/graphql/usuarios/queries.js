import { gql } from '@apollo/client';

const GET_USUARIOS = gql`
  query Usuarios ($_id: ID!){
    Usuarios(_id: $_id) {
      _id
      nombre
      email
      estado
      idUsuario
      rol
    }
  }
`;

const GET_USUARIO = gql`
  query Usuario($_id: ID!, $usuario: ID!) {
    Usuario(_id: $_id, usuario: $usuario) {
      _id
      nombre
      email
      estado
      idUsuario
      rol
    }
  }
`;

export { GET_USUARIOS, GET_USUARIO };
