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

const CAMBIAR_ESTADO_USUARIO = gql`
mutation CambiarEstado($_id: ID!, $usuario: ID!, $estado: Enum_EstadoUsuario!) {
  cambiarEstado(_id: $_id, usuario: $usuario, estado: $estado)
}
`;

export { EDITAR_USUARIO, CAMBIAR_ESTADO_USUARIO };
