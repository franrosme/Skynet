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
    estado: Enum_EstadoProyecto
    fase: String
    lider: String
    idLider: String
    avance: [Avance]
    inscripcion: [Inscripcion]
     
  }
  type Query {
    Proyectos: [Proyecto]
    ListarProyectos(rol:Enum_Rol!, idLider: String): [Proyecto]    
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
    aprobarProyecto(rol:Enum_Rol!, nombre:String!):String
    cambiarEstado(rol:Enum_Rol!, nombre:String!, estado: Enum_EstadoProyecto):String
    cambiarFase(
      rol:Enum_Rol!,
      faseActual: Enum_FaseProyecto!,
      fase: Enum_FaseProyecto!,
      nombre:String!
   ): String

  }
`;

export { tiposProyecto };