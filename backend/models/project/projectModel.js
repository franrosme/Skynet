import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const projectSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    objetivosGenerales: {
        type: String,
        required: true
    },
    objetivosEspecificos: {
        type: Array,
        required: true
    },
    presupuesto: {
      type: Number,
      required: true,
    },
    fechaInicio: {
      type: Date,
      default: new Date()
    },
    fechaFin: {
      type: Date,
    },
    lider:{
      type:String,
      required: true

    }, 
    idLider: {
      type:String,
      required: true,
    },
    estado: {
      type: String,
      enum: ['Activo', 'Inactivo'],
      default: 'Inactivo',
    },
    fase: {
      type: String,
      enum: ['Iniciado', 'En_Desarrollo', 'Terminado', null],
      default: null,
    },
    inscripcion: [{
        idInscripcion: {
            type: Schema.Types.ObjectId,
            required: true,  
            auto: true,  
            
        },
        idEstudiante: {
            type: String,
            required: true,
        },
        estado: {
            type: String,
            enum: ['Aceptado', 'Rechazado', 'Pendiente'],
            default: 'Pendiente',
            required: true,
        },
        fechaDeIngreso: {
            type: Date,
            default: new Date()
        },
        fechaDeEgreso: {
            type: Date,
        }
    }],
    avance: [{
        idAvance: {
            type: Schema.Types.ObjectId,
            required: true,
            auto: true,  
            },
            fecha: {
                type: Date,
                required: true,
            },
            descripcion: {
                type: String,
                required: true,
            },
            observacionesDelLider: {
                type: Array,
                required: true,
            }
        
    }]
   
  },
);

const ProjectModel = model('Proyecto', projectSchema);

export { ProjectModel };