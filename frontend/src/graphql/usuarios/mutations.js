import { gql } from '@apollo/client';

const EDITAR_USUARIO = gql`
mutation EditarUsuario($_id: String!, $clave: String, $email: String, $idUsuario: String, $nombre: String, $usuario: String!) {
  editarUsuario(_id: $_id, clave: $clave, email: $email, idUsuario: $idUsuario, nombre: $nombre, usuario: $usuario) {
    _id
    idUsuario
    email
    nombre
    rol
    estado
  }
}
`;

const CAMBIAR_ESTADO_USUARIO = gql`
mutation CambiarEstado($_id: ID!, $usuario: ID!, $estado: Enum_EstadoUsuario!) {
  cambiarEstado(_id: $_id, usuario: $usuario, estado: $estado)
}
`;

export { EDITAR_USUARIO, CAMBIAR_ESTADO_USUARIO };
