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
mutation CambiarEstadoInscripcion($idUsuario: String!, $idInscripcion: ID!, $lider: String, $estado: Enum_EstadoInscripcion!) {
  cambiarEstadoInscripcion(idUsuario: $idUsuario, idInscripcion: $idInscripcion, lider: $lider, estado: $estado)
}`;

const ADD_OBSERVACION = gql`
mutation AgregarObservaciones($idUsuario: String!, $idAvance: ID!, $observacionesDelLider: [String!]) {
  agregarObservaciones(idUsuario: $idUsuario, idAvance: $idAvance, observacionesDelLider: $observacionesDelLider)
}`;

const ADD_AVANCE = gql`
mutation RegistrarAvance($idProyecto: ID!, $idEstudiante: String!, $avance: inputAvance) {
  registrarAvance(idProyecto: $idProyecto, idEstudiante: $idEstudiante, avance: $avance)
}`;
const EDIT_AVANCE = gql`
mutation avance( $idAvance: ID!, $idEstudiante: String!, $descripcion: String!) {
  editarAvance(idAvance: $idAvance, idEstudiante: $idEstudiante, descripcion: $descripcion)
}`;

const INSCRIPCION = gql`
mutation inscripcion($idProyecto: ID!, $inscripcion: inputInscripcion) {
  inscripcion(idProyecto: $idProyecto, inscripcion: $inscripcion)
}`;

const APROBAR = gql`
mutation AprobarProyecto($idUsuario: String!, $idProyecto: ID!) {
  aprobarProyecto(idUsuario: $idUsuario, idProyecto: $idProyecto)
}`;
const INACTIVAR = gql`
mutation InactivarProyecto($idUsuario: String!, $idProyecto: ID!) {
  inactivarProyecto(idUsuario: $idUsuario, idProyecto: $idProyecto)
}`;
const REABRIR = gql`
mutation ReabrirProyecto($idUsuario: String!, $idProyecto: ID!) {
  reabrirProyecto(idUsuario: $idUsuario, idProyecto: $idProyecto)
}`;
const TERMINAR = gql`
mutation TerminarProyecto($idUsuario: String!, $idProyecto: ID!) {
  terminarProyecto(idUsuario: $idUsuario, idProyecto: $idProyecto)
}`;
export { EDITAR_PROYECTO, CREAR_PROYECTO, ESTADO_INSCRIPCION, ADD_OBSERVACION, ADD_AVANCE, INSCRIPCION, EDIT_AVANCE, APROBAR, INACTIVAR,REABRIR,TERMINAR };
