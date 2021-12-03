import { UserModel } from './userModel.js';
import bcrypt from  'bcrypt';
const resolversUsuario = {
  Query: {
    Usuarios: async (parent, args) => {
      const user = await UserModel.findOne({ _id: args._id})
      if(user && user.estado === "Autorizado" && (user.rol==="Administrador" || user.rol==="Lider")){
      const usuarios = await UserModel.find();
      return usuarios;
    } else {
        return console.log('usuario no autorizado')     
    };
  },
  Usuario: async (parent, args) => {
    const user = await UserModel.findOne({ _id: args._id})
    if(user && user.estado === "Autorizado" && (user.rol==="Administrador" || user.rol==="Lider")){
      const usuario = await UserModel.findOne({ _id: args.usuario})
      return usuario;
    }else {
      return 'usuario no autorizado'       
    };
  },
},
  Mutation: {
    crearUsuario: async (parent, args) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.clave, salt);
      const usuarioCreado = await UserModel.create({
        email: args.email,
        idUsuario: args.idUsuario,
        nombre: args.nombre,
        clave: hashedPassword,
        rol: args.rol,
      });

     return usuarioCreado;
    },
    cambiarEstado: async (parent, args) => {
      const user = await UserModel.findOne({ _id: args._id})
      const user2 = await UserModel.findOne({ _id: args.usuario })
      
      if(user && user2 && user.estado === "Autorizado" && user.rol==="Administrador"){
        const nuevoEstado = await UserModel.updateOne({         
            _id:args.usuario},
          { $set: { "estado": args.estado} }
          );
          if(nuevoEstado.modifiedCount>0){
            return "El estado de " + user2.nombre +" fue actualizado a: " + args.estado
          }
          else{ return "No se pudo actualizar el estado de: " + user2.nombre };
      }
      else if(user && user.estado === "Autorizado" && user.rol==="Lider"){
        if(user2 && user2.rol==="Estudiante" && (args.estado==="Pendiente" || args.estado==="Autorizado")){
        const aprobar = await UserModel.updateOne({         
            _id:args.usuario},
          { $set: { "estado": args.estado} }
          );
          if(aprobar.modifiedCount>0){
            return "El estado de " + user2.nombre +" fue actualizado a: " + args.estado
          }
          else{return "No se pudo actualizar el estado de: " + user2.nombre};}
          else{return "Solo puede actualizar el estado de los estudiantes "}
      }
      else{
        return "Usuario o rol no autorizado"
      }
    },
    editarUsuario: async (parent, args) => {
      const user = await UserModel.findOne({ _id: args._id })
      if(user && user.estado === "Autorizado" && (user.rol==="Administrador" || user.rol==="Lider" || user.rol==="Estudiante")){
      
      const usuarioEditado = await UserModel.findByIdAndUpdate(
        args.usuario,
        {
          email: args.email,
          idUsuario: args.idUsuario,
          nombre: args.nombre,
          
        },
        { new: true }
      );

      return usuarioEditado;
      }else { return console.log("Usuario o rol no autorizado");}
    },
    eliminarUsuario: async (parent, args) => {
      const user = await UserModel.findOne({ _id: args._id})
      if(user && user.estado === "Autorizado" && (user.rol==="Administrador" || user.rol==="Lider" || user.rol==="Estudiante")){
      
      if (Object.keys(args).includes('idUsuario')) {
        const usuarioEliminado = await UserModel.findOneAndDelete({ _id: args._id });
        return "El usuario: " + user.nombre + "fue eliminado";
      } else if (Object.keys(args).includes('email')) {
        const usuarioEliminado = await UserModel.findOneAndDelete({ email: args.email });
        return "El usuario: " + user.nombre + "fue eliminado";
      }else { return "No se pudo eliminar el usuario";}
    }else { return "Usuario o rol no autorizado";}
    },
  },
  };
export { resolversUsuario };