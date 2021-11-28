import { gql } from 'apollo-server-express';

const tiposProyecto = gql`
  type Avance {
    idAvance: ID!
    fecha: Date!
    descripcion: String!
    observacionesDelLider: [String!]
    }
    input inputAvance {
    descripcion: String!
    }
  type Inscripcion {
    idInscripcion: ID!
    idEstudiante: String!
    estado: Enum_EstadoInscripcion
    fechaDeIngreso: Date!
    fechaDeEgreso: Date
  }
  input inputInscripcion {
    idEstudiante: String!
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
  type LProyectos {
    _id:ID!
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
    avance: [Avance]
     
  }
  type Query {
    ListarProyectos(idUsuario: String!): [LProyectos]
    ListarInscripciones(idUsuario: String!):[LInscripcion] 
    VerAvances(nombre:String!, rol:Enum_Rol!, idEstudiante: String!):[LAvance] 
    VerProyecto(idUsuario: String!, idProyecto:ID!): Proyecto
  }
  type Mutation {
    crearProyecto(rol:Enum_Rol! 
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
    editarProyecto(
      _id: ID!
      rol:Enum_Rol!
      idLider: String! 
      nombre: String
      objetivosGenerales: String
      objetivosEspecificos: [String]
      presupuesto: Int
    ):String
    aprobarProyecto(rol:Enum_Rol!, nombre:String!):String
    cambiarEstado(rol:Enum_Rol!, nombre:String!, estado: Enum_EstadoProyecto):String
    cambiarFase(
      rol:Enum_Rol!,
      faseActual: Enum_FaseProyecto!,
      fase: Enum_FaseProyecto!,
      nombre:String!
   ): String
   cambiarEstadoInscripcion(rol:Enum_Rol!, idInscripcion: ID!, estado: Enum_EstadoInscripcion!):String
    agregarObservaciones(rol:Enum_Rol!, idLider: String!, idAvance: ID!, observacionesDelLider: [String!]):String
    inscripcion(nombre: String!, rol:Enum_Rol!, inscripcion: inputInscripcion): String
    registrarAvance(nombre: String!, rol:Enum_Rol!, avance: inputAvance):String
    editarAvance(nombre: String!, idAvance: ID!,rol:Enum_Rol!, descripcion: String!):String
  }
`;

export { tiposProyecto };