import { gql } from 'apollo-server-express';

const tiposProyecto = gql`
  type Avance {
    idAvance: ID!
    fecha: Date!
    descripcion: String!
    observacionesDelLider: [String!]
    }
  type Inscripcion {
    idInscripcion: ID!
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
    fechaInicio: Date!
    fechaFin: Date
    estado: String
    fase: String
    lider: String
    idLider: String
    avance: [Avance]
    inscripcion: [Inscripcion]
  }
  type Query {
    Proyectos: [Proyecto]
  }
  type Mutation {
    crearProyecto( 
    nombre: String!
    objetivosGenerales: String!
    objetivosEspecificos: [String!]
    presupuesto: Int!
    fechaInicio: Date
    lider: String
    idLider: String
    estado: Enum_EstadoProyecto
    fase: Enum_FaseProyecto
    ): Proyecto
  }
`;

export { tiposProyecto };