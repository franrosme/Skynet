import { gql } from '@apollo/client';

const EDITAR_PROYECTO = gql`

mutation EditarProyecto($idUsuario:ID!, $idProyecto: ID!, $campos: editProyecto) {
  editarProyecto(idUsuario: $idUsuario, 
    idProyecto: $idProyecto, 
    campos: $campos)
}`

const CREAR_PROYECTO = gql`
mutation CrearProyecto($idUsuario: ID!, $campos: crearProyecto) {
  crearProyecto(idUsuario: $idUsuario, campos: $campos) {
    nombre
    _id
    objetivosGenerales
    objetivosEspecificos
    presupuesto
    fechaInicio
    estado
    fase
  }
}

`;
const ESTADO_INSCRIPCION = gql`
mutation CambiarEstadoInscripcion($idUsuario: String!, $idInscripcion: ID!, $lider: String!, $estado: Enum_EstadoInscripcion!) {
  cambiarEstadoInscripcion(idUsuario: $idUsuario, idInscripcion: $idInscripcion, lider: $lider, estado: $estado)
}`;


export { EDITAR_PROYECTO, CREAR_PROYECTO, ESTADO_INSCRIPCION, };
