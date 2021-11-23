import { UserModel } from './userModel.js';
import aes256 from 'aes256';
const key = 'CLAVEDIFICIL';
const resolversUsuario = {
    Query: {
      Usuarios: async (parent, args) => {
        console.log('parent usuario', parent);
        const usuarios = await UserModel.find();
        return usuarios;
      },
      Usuario: async (parent, args) => {
        const usuario = await UserModel.findOne({idUsuario: args.idUsuario });
        return usuario;
      },
    },
    Mutation: {
      crearUsuario: async (parent, args) => {
        const encryptedPass = aes256.encrypt(key, args.clave);
        const usuarioCreado = await UserModel.create({
          email: args.email,
          idUsuario: args.idUsuario,
          nombre: args.nombre,
          clave: encryptedPass,
          rol: args.rol,
        });
  
        if (Object.keys(args).includes('estado')) {
          usuarioCreado.estado = args.estado;
        }
  
        return usuarioCreado;
      },
      editarUsuario: async (parent, args) => {
        const usuarioEditado = await UserModel.findByIdAndUpdate(
          args._id,
          {
            email: args.email,
            idUsuario: args.idUsuario,
            nombre: args.nombre,
            estado: args.estado
          },
          { new: true }
        );
  
        return usuarioEditado;
      },
      eliminarUsuario: async (parent, args) => {
        if (Object.keys(args).includes('idUsuario')) {
          const usuarioEliminado = await UserModel.findOneAndDelete({ idUsuario: args.idUsuario });
          return usuarioEliminado;
        } else if (Object.keys(args).includes('email')) {
          const usuarioEliminado = await UserModel.findOneAndDelete({ email: args.email });
          return usuarioEliminado;
        }
      },
    },
  };
export { resolversUsuario };