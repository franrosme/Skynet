import { gql } from '@apollo/client';

const GET_PROYECTOS = gql`
query ListarProyectos($idUsuario: ID!) {
  ListarProyectos(idUsuario: $idUsuario) {
    _id
    nombre
    fase
    estado
    lider {
      nombre
      idUsuario
    }
  }
}
`;

const GET_PROYECTO = gql`
query VerProyecto($idUsuario: ID!, $idProyecto: ID!) {
  VerProyecto(idUsuario: $idUsuario, idProyecto: $idProyecto) {
    nombre
    presupuesto
    fase
    estado
    lider {
      nombre
      idUsuario
      email
    }
    objetivosGenerales
    objetivosEspecificos
    fechaInicio
    fechaFin
    avance {
      fecha
      descripcion
      observacionesDelLider
    }
    inscripcion {
      idEstudiante
      estado
      fechaDeIngreso
      fechaDeEgreso
    }
  }
}
`;
const GET_INSCRIPCION = gql`
query GetInscripcion($idUsuario: ID!, $idInscripcion: ID!) {
  getInscripcion(idUsuario: $idUsuario, idInscripcion: $idInscripcion) {
    nombre
    inscripcion {
      _id
      idEstudiante
      estado
      fechaDeIngreso
      fechaDeEgreso
    }
  }}
`;

const INSCRIPCIONES = gql`
query ListarInscripciones($idUsuario: String!) {
  ListarInscripciones(idUsuario: $idUsuario) {
    nombre
    inscripcion {
      _id
      idEstudiante
      estado
      fechaDeIngreso
      fechaDeEgreso
    }
  }
}
`;

export { GET_PROYECTOS, GET_PROYECTO,  GET_INSCRIPCION, INSCRIPCIONES };
