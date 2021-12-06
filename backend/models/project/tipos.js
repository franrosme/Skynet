import { gql } from 'apollo-server-express';

const tiposProyecto = gql`
  type Avance {
    _id: ID!
    fecha: Date!
    descripcion: String!
    observacionesDelLider: [String!]
    }
  type Inscripcion {
    _id: ID!
    idEstudiante: String!
    estado: Enum_EstadoInscripcion
    fechaDeIngreso: Date!
    fechaDeEgreso: Date
  }
  type Proyecto {
    _id: ID!
    nombre: String!
    objetivosGenerales: String!
    objetivosEspecificos: [String!]
    presupuesto: Int!
    fechaInicio: Date
    fechaFin: Date
    estado: Enum_EstadoProyecto
    fase: String
    lider: Usuario
    avance: [Avance]
    inscripcion: [Inscripcion]
    }
  type ProyectoCreado {
    _id:ID
    nombre: String
    objetivosGenerales: String
    objetivosEspecificos: [String]
    presupuesto: Int
    fechaInicio: Date
    estado: Enum_EstadoProyecto
    fase: String
  }
  type LProyectos {
    _id:ID
    nombre: String!
    fase: Enum_FaseProyecto
    estado: Enum_EstadoProyecto
    lider:Usuario
  }
  type LInscripcion {
    nombre: String!
    inscripcion: [Inscripcion]
  }
  type LAvance {
  nombre: String!
  avance: [Avance]
  }
  input inputAvance {
    descripcion: String!
  }
  input editProyecto {
    nombre: String
    objetivosGenerales: String
    objetivosEspecificos: [String]
    presupuesto: Int
    lider: String
    fechaInicio: Date
    fechaFin: Date
  }
  input crearProyecto {
    nombre: String!
    objetivosGenerales: String!
    objetivosEspecificos: [String!]
    presupuesto: Int!
  }
  input inputInscripcion {
    idEstudiante: String!
  }

  type Query {
    ListarProyectos(idUsuario: ID!): [LProyectos]
    ListarInscripciones(idUsuario: ID!):[LInscripcion] 
    VerProyecto(idUsuario: ID!, idProyecto:ID!): Proyecto
    VerAvances(idUsuario: ID!, idProyecto:ID!):[LAvance] 
  }

  type Mutation {
    crearProyecto(idUsuario: ID!, campos: crearProyecto): ProyectoCreado
    editarProyecto(idUsuario: ID!, idProyecto: ID!, campos: editProyecto): String
    aprobarProyecto(idUsuario: ID!, idProyecto: ID!): String
    inactivarProyecto(idUsuario: ID!, idProyecto: ID!): String
    terminarProyecto( idUsuario: ID!, idProyecto: ID!): String
    cambiarEstadoInscripcion(idUsuario: ID!, idInscripcion: ID!, lider: String! estado: Enum_EstadoInscripcion!): String
    agregarObservaciones(idUsuario: ID!, idAvance: ID!, observacionesDelLider: [String!]): String
    inscripcion(idProyecto: ID!, inscripcion: inputInscripcion): String
    registrarAvance(idProyecto: ID!, idEstudiante: String!, avance: inputAvance): String
    editarAvance(idAvance: ID!, idEstudiante: String!, descripcion: String!): String
    reabrirProyecto(idUsuario: ID!, idProyecto: ID!): String
}
`;

export { tiposProyecto };