import mongoose from 'mongoose';
import { UserModel } from "../user/userModel.js";
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
    },
    fechaFin: {
      type: Date,
    },
    lider:{
      type: Schema.Types.ObjectId,
        ref: UserModel,
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
        estudiante: {
          type: Schema.Types.ObjectId,
          ref: UserModel,
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
            default: null
        },
        fechaDeEgreso: {
            type: Date,
            default: null
        }
    }],
    avance: [{
            fecha: {
                type: Date,
                required: true,
                default: new Date()
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

const ProjectModel = model('proyectos', projectSchema);

export { ProjectModel };