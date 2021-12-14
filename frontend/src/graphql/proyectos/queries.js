import { gql } from '@apollo/client';

const GET_PROYECTOS = gql`
query ListarProyectos($idUsuario: ID!) {
  ListarProyectos(idUsuario: $idUsuario) {
    _id
    nombre
    presupuesto
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
query Query($idUsuario: ID!, $idProyecto: ID!) {
  VerProyecto(idUsuario: $idUsuario, idProyecto: $idProyecto
   ) {
    _id
    nombre
    objetivosGenerales
    objetivosEspecificos
    presupuesto
    fechaInicio
    fechaFin
    estado
    fase
    lider {
      _id
      idUsuario
      email
      nombre
      rol
      estado
    }
    avance {
      _id
      fecha
      descripcion
      observacionesDelLider
    }
    inscripcion {
      _id
      estado
      fechaDeIngreso
      fechaDeEgreso
      estudiante {
        _id
        idUsuario
        email
        nombre
        rol
        estado
      }
    }
  }
}
`;
const GET_INSCRIPCION = gql`
query getInscripcion($idUsuario: ID!, $idInscripcion: ID!) {
  getInscripcion(idUsuario: $idUsuario, idInscripcion: $idInscripcion) {
    nombre
    inscripcion {
      _id
      estudiante {
        _id
        idUsuario
        email
        nombre
        rol
        estado
      }
      estado
      fechaDeIngreso
      fechaDeEgreso
    }
  }
}
`;

const INSCRIPCIONES = gql`
query ListarInscripciones($idUsuario: ID!) {
  ListarInscripciones(idUsuario: $idUsuario) {
    nombre
    lider
    inscripcion {
      _id
      estudiante {
        _id
        idUsuario
        email
        nombre
        rol
        estado
      }
      estado
      fechaDeIngreso
      fechaDeEgreso
    }
  }
}
`;
const AVANCES = gql`
query ListarAvances($idUsuario: ID!) {
  ListarAvances(idUsuario: $idUsuario) {
    nombre
    avance {
      _id
      fecha
      descripcion
      observacionesDelLider
    }
  }
}
`;
const VER_AVANCE = gql`
query VerAvance($idUsuario: ID!, $idAvance: ID!) {
  VerAvance(idUsuario: $idUsuario, idAvance: $idAvance) {
    nombre
    avance {
      _id
      fecha
      descripcion
      observacionesDelLider
    }
  }
}
`;

export { GET_PROYECTOS, GET_PROYECTO,  GET_INSCRIPCION, INSCRIPCIONES, AVANCES, VER_AVANCE };
