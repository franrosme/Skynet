import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  idUsuario: {
        type: String,
        required: true,
        unique: true,
      },
    email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
   
      message: 'El formato del correo electrónico es incorrecto.',
    },
  },
 
  nombre: {
    type: String,
    required: true,
  },

  clave: {
    type: String,
    required: true,
  },

  rol: {
    type: String,
    required: true,
    enum: ['Estudiante', 'Lider', 'Administrador'],
  },

  estado: {
    type: String,
    enum: ['Pendiente', 'Autorizado', 'No_Autorizado'],
    default: 'Pendiente',
  },
});

const UserModel = model('usuarios', userSchema);

export { UserModel };