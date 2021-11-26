import { gql } from '@apollo/client';

const EDITAR_USUARIO = gql`
  mutation EditarUsuario(
    $_id: String!
    $nombre: String!
    $idUsuario: String!
    $email: String!
    $estado: Enum_EstadoUsuario!
  ) {
    editarUsuario(
      _id: $_id
      nombre: $nombre
      idUsuario: $idUsuario
      email: $email
      estado: $estado
    ) {
      _id
      nombre
      email
      estado
      idUsuario
      rol
    }
  }
`;

export { EDITAR_USUARIO };
