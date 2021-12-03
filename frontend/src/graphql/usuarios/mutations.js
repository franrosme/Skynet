import { gql } from '@apollo/client';

const EDITAR_USUARIO = gql`
  mutation EditarUsuario(
    $_id: String!
    $usuario: String!
    $nombre: String!
    $idUsuario: String!
    $email: String!
   
  ) {
    editarUsuario(
      _id: $_id
      usuario: $usuario
      nombre: $nombre
      idUsuario: $idUsuario
      email: $email
    
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
