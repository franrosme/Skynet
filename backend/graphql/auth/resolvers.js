import { UserModel } from '../../models/user/userModel.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/tokenUtils.js';

const resolversAutenticacion = {
  Mutation: {
    registro: async (parent, args) => {
      const usuarioEcontrado = await UserModel.findOne({ email: args.email });
      const idEncontrado = await UserModel.findOne({ idUsuario: args.idUsuario });
      if(idEncontrado){
        return{
          error:"Ya se encuentra registrado el ID: "+ args.idUsuario
        }
      } else if(usuarioEcontrado){
        return{
        error:"El email: "+ args.email +" ya se encuentra registrado"
        }
      } else {
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
          idUsuario: usuarioCreado.idUsuario,
          email: usuarioCreado.email,
          rol: usuarioCreado.rol,
         
        },
       { error: null}),
      };}
     
    },

    login: async (parent, args) => {
      const usuarioEcontrado = await UserModel.findOne({ email: args.email });
      
      if(usuarioEcontrado){
        if (await bcrypt.compare(args.clave, usuarioEcontrado.clave)) {
          return {
            token: generateToken({
              _id: usuarioEcontrado._id,
              nombre: usuarioEcontrado.nombre,
             idUsuario: usuarioEcontrado.idUsuario,
              email: usuarioEcontrado.email,
              rol: usuarioEcontrado.rol,
              
            },{error: null}),
          };
        }else{
          return {
            error:"Contraseña incorrecta",
          };
  
        }

      }else{
        return {
          error:"Usuario no existe",
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