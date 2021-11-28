import { UserModel } from '../../models/user/userModel.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/tokenUtils.js';

const resolversAutenticacion = {
  Mutation: {
    registro: async (parent, args) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.clave, salt);
      const usuarioCreado = await UserModel.create({
        nombre: args.nombre,
        idUsuario: args.idUsuario,
        email: args.email,
        rol: args.rol,
        clave: hashedPassword,
      });
      console.log('usuario creado', usuarioCreado);
      return {
        token: generateToken({
          _id: usuarioCreado._id,
          nombre: usuarioCreado.nombre,
          ideUsuario: usuarioCreado.idUsuario,
          email: usuarioCreado.email,
          rol: usuarioCreado.rol,
        }),
      };
    },

    login: async (parent, args) => {
      const usuarioEcontrado = await UserModel.findOne({ email: args.email });
      if (await bcrypt.compare(args.clave, usuarioEcontrado.clave)) {
        return {
          token: generateToken({
            _id: usuarioEcontrado._id,
            nombre: usuarioEcontrado.nombre,
           idUsuario: usuarioEcontrado.idUsuario,
            email: usuarioEcontrado.email,
            rol: usuarioEcontrado.rol,
          }),
        };
      }
    },

    refreshToken: async (parent, args, context) => {
      console.log('contexto', context);
      if (!context.userData) {
        return {
          error: 'token no valido',
        };
      } else {
        return {
          token: generateToken({
            _id: context.userData._id,
            nombre: context.userData.nombre,
            idUsuario: context.userData.idUsuario,
            email: context.userData.email,
            rol: context.userData.rol,
          }),
        };
      }
      // valdiar que el contexto tenga info del usuario. si si, refrescar el token
      // si no devolver null para que en el front redirija al login.
    },
  },
};

export { resolversAutenticacion };