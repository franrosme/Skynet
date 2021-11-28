import { ProjectModel } from './projectModel.js';
import { UserModel } from '../user/userModel.js';

const resolversProyecto = {
    Query: {
      ListarProyectos: async (parent, args) => {
        const user = await UserModel.findOne({ idUsuario: args.idUsuario })
        if (user && user.estado === "Autorizado" && (user.rol==="Administrador"||user.rol==="Estudiante")) {
          const proyectos = await ProjectModel.find({},{}).populate("lider");
          return proyectos;
        }
        else if(user && user.estado === "Autorizado" && user.rol==="Lider"){
          const proyectos = await ProjectModel.find({lider:user._id},{}).populate("lider");
          return proyectos;
        } else {
            return console.log("Rol no valido o usuario no autorizado")}
        },
        ListarInscripciones: async (parent, args) => {
          const user = await UserModel.findOne({ idUsuario: args.idUsuario })
          if(user && user.estado === "Autorizado" && user.rol==="Lider"){
            const inscripcion = await ProjectModel.find({lider:user._id},{"inscripcion":1,"nombre":1});
            return inscripcion;
          }
          else if(user && user.estado === "Autorizado" && user.rol==="Administrador"){
            const inscripcion = await ProjectModel.find({},{"inscripcion":1,"nombre":1});
            return inscripcion;
          } else{
            return console.log("Rol no valido o usuario no autorizado") }      
        },
        VerProyecto: async (parent, args) => {
          const user = await UserModel.findOne({ idUsuario: args.idUsuario })
          if(user && user.estado === "Autorizado" && user.rol==="Administrador"){
            const proyecto = await ProjectModel.findOne({_id:args.idProyecto}).populate("lider");
            return proyecto;
          } 
          else if(user && user.estado === "Autorizado" && user.rol==="Lider"){
            const proyecto = await ProjectModel.findOne({
              $and:[
                {_id:{$eq:args.idProyecto}},           
                {lider:{$eq:user._id}},
              ]}).populate("lider");
            return proyecto;
            } 
          else if(user && user.estado === "Autorizado" && user.rol==="Estudiante"){
              const proyecto = await ProjectModel.findOne({_id:args.idProyecto}).populate("lider");
              return proyecto;
          } else{
            return console.log("Rol no valido o usuario no autorizado") }
        },
        VerAvances: async (parent, args) => {
          const user = await UserModel.findOne({ idUsuario: args.idUsuario })
          if(user && user.estado === "Autorizado" && user.rol==="Estudiante"){
          const avance = await ProjectModel.find({
            $and:[
              {_id:{$eq:args.idProyecto}}, 
              {"inscripcion.idEstudiante":{$eq:user.idUsuario}},
              {"inscripcion.estado":{$eq:"Aceptada"}}]});
            return avance;
          }
          else if(user && user.estado === "Autorizado" && user.rol==="Lider"){
            const avance = await ProjectModel.find({
              $and:[
                {_id:{$eq:args.idProyecto}}, 
                { lider:{$eq:user._id}}]});
              return avance;
          }
          else if(user && user.estado === "Autorizado" && user.rol==="Administrador"){
            const avance = await ProjectModel.find({_id:args.idProyecto});
             
            return avance;
          } else{
            return console.log("Rol no valido o usuario no autorizado")
          }
        },
    },
    Mutation: {
      crearProyecto: async (parent, args) => {
        const user = await UserModel.findOne({ idUsuario: args.idUsuario })
        if(user && user.estado === "Autorizado" && user.rol==="Lider"){
        const proyectoCreado = await ProjectModel.create({
          nombre: args.campos.nombre,
          objetivosGenerales:args.campos.objetivosGenerales,
          objetivosEspecificos: args.campos.objetivosEspecificos,
          presupuesto: args.campos.presupuesto,
          lider: user._id,
        });
        return proyectoCreado;
      }
      },
      editarProyecto: async (parent, args) => {
        const user = await UserModel.findOne({ idUsuario: args.idUsuario })
        if(user && user.estado === "Autorizado" && user.rol==="Administrador"){
        const proyectoActualizado = await ProjectModel.updateOne({
          $and:[
            {estado:{$eq:"Activo"}},
            {_id:{$eq:args.idProyecto}}
          ]},
        {$set:{
          nombre: args.campos.nombre,
          objetivosGenerales:args.campos.objetivosGenerales,
          objetivosEspecificos: args.campos.objetivosEspecificos,
          presupuesto: args.campos.presupuesto,
          lider: args.campos.lider,
          fechaInicio: args.campos.fechaInicio,
          fechaFin: args.campos.fechaFin,
          }
      });
      if(proyectoActualizado.modifiedCount>0){
        return "Proyecto actualizado";
      }
      else{ return "El proyecto no se pudo actualizar"}
        
      }else if(user && user.estado === "Autorizado" && user.rol==="Lider"){
        const proyectoActualizado = await ProjectModel.updateOne({
          $and:[
            {lider:{$eq:user._id}},
            {estado:{$eq:"Activo"}},
            {_id:{$eq:args.idProyecto}}
          ]},
        {$set:{
          nombre: args.campos.nombre,
          objetivosGenerales:args.campos.objetivosGenerales,
          objetivosEspecificos: args.campos.objetivosEspecificos,
          presupuesto: args.campos.presupuesto,
          lider: args.campos.lider,
          fechaInicio: args.campos.fechaInicio,
          fechaFin: args.campos.fechaFin,
          }
      });
      if(proyectoActualizado.modifiedCount>0){
        return "Proyecto actualizado";
      }
      else{ return "El proyecto no se pudo actualizar"}
        
      }else{ return "Rol no valido"}
      },
      aprobarProyecto: async (parent, args) => {
        const user = await UserModel.findOne({ idUsuario: args.idUsuario })
        if(user && user.estado === "Autorizado" && user.rol==="Administrador"){
          const aprobar = await ProjectModel.updateOne({
            $and:[
              {estado:{$eq:"Inactivo"}},
              {fase:{$eq:null}},
              {_id:{$eq:args.idProyecto}}
            ]},
            { $set: { "estado": "Activo", "fase" : "Iniciado", "fechaInicio": new Date()} }
            );
            if(aprobar.modifiedCount>0){
              return "proyecto aprobado"
            }
            else{ return "No se pudo aprobar el proyecto"};
        }else{
          return "No es administrador"
        }
      },
      reabrirProyecto: async (parent, args) => {
        const user = await UserModel.findOne({ idUsuario: args.idUsuario })
        if(user && user.estado === "Autorizado" && user.rol==="Administrador"){
          const reabrir = await ProjectModel.updateOne({
            $and:[
              {estado:{$eq:"Inactivo"}},
              {$or:[{fase:{$eq:"Iniciado"}},{fase:{$eq:"En_Desarrollo"}}]},
              {_id:{$eq:args.idProyecto}}
            ]},
            { $set: { "estado": "Activo"} }
            );
            if(reabrir.modifiedCount>0){
              return "proyecto reabierto"
            }
            else{ return "No se pudo reabrir el proyecto"};
        }else{
          return "No es administrador"
        }
      },
      inactivarProyecto: async (parent, args) => {
        const user = await UserModel.findOne({ idUsuario: args.idUsuario })
        if(user && user.estado === "Autorizado" && user.rol==="Administrador"){
          const inactivar = await ProjectModel.updateOne({
            $and:[
              {_id:{$eq:args.idProyecto}},
              {estado:{$eq:"Activo"}},
              {$or:[{fase:{$eq:"Iniciado"}},{fase:{$eq:"En_Desarrollo"}}]},
            ]},
            { $set: { "estado" : "Inactivo"
            } }
            );
            if(inactivar.modifiedCount>0){
              const busqueda = await ProjectModel.findOne({_id:args.idProyecto});
              for(let i = 0; i < busqueda.inscripcion.length; i++) {
                if(busqueda.inscripcion[i].estado==="Aceptada" && busqueda.inscripcion[i].fechaDeEgreso===null){
                  const proyectos = await ProjectModel.updateOne({
                    "inscripcion._id":busqueda.inscripcion[i]._id
                    },
                    { $set: {"inscripcion.$.fechaDeEgreso": new Date()
                    } }
                    );
                }             
            }
              return busqueda.nombre + ". Nuevo estado: Inactivo"
            }
            else{ return "No se pudo cambiar el estado del proyecto"};
           }     
        else{
          return "no es administrador"
        }
      },
      cambiarEstado: async (parent, args) => {
        if(args.rol==="Administrador"){
          const proyectos = await ProjectModel.updateOne({nombre:args.nombre},
            { $set: { "estado" : args.estado } }
            );
            console.log(args.nombre+". Nuevo estado: "+args.estado);
          return args.nombre+". Nuevo estado: "+args.estado

        }else{
          console.log("no es administrador")

          return "no es administrador"
        }

      },
      cambiarFase: async (parent, args) => {
        if(args.rol==="Administrador" && args.fase==="Terminado" && args.faseActual==="En_Desarrollo"){
          const proyectos = await ProjectModel.updateOne({nombre:args.nombre},
            { $set: { "fase" : args.fase,
                      "estado" :"Inactivo"} }
            );
            console.log(args.nombre+". Nueva fase: "+args.fase);
          return args.nombre+". Nueva fase: "+args.fase

        }else{
          console.log("no es administrador")

          return "no es administrador"
        }

      },
      cambiarEstadoInscripcion: async (parent, args) => {
        if(args.rol==="Lider"){
          const proyectos = await ProjectModel.updateOne({"inscripcion.idInscripcion":args.idInscripcion},
            { $set: { "inscripcion.$.estado": args.estado} }
            );
            console.log("Nuevo estado: "+args.estado);
          return " Nuevo estado: "+args.estado

        }else{
          console.log("no es administrador")

          return "no es administrador"
        }

      },
      agregarObservaciones: async (parent, args) => {
        if(args.rol==="Lider"){
          const proyectos = await ProjectModel.updateOne({"avance.idAvance":args.idAvance, idLider:args.idLider},
            { $set: { "avance.$.observacionesDelLider": args.observacionesDelLider} }
            );
            console.log("Observaciones: "+args.observacionesDelLider);
          return "Observaciones: "+args.observacionesDelLider

        }else{
          console.log("no es administrador")

          return "no es administrador"
        }

      },
      inscripcion:  async (parent, args) => {
        if(args.rol==="Estudiante"){
          const inscripcion = await ProjectModel.updateOne({nombre:args.nombre},
            { $push: { inscripcion: args.inscripcion} }
            );
            
          return "Inscripcion exitosa"
        }
        else{
          return "no es estudiante"
        }

      },
      registrarAvance:  async (parent, args) => {
        if(args.rol==="Estudiante"){
          const avance = await ProjectModel.updateOne({nombre:args.nombre},
            { $push: { avance: args.avance} }
            );
            
          return "avance registrado correctamente"
        }
        else{
          return "no es estudiante"
        }

      },
      editarAvance:  async (parent, args) => {
        if(args.rol==="Estudiante"){
          const avance = await ProjectModel.updateOne({nombre:args.nombre,"avance.idAvance": args.idAvance},
            { $set: { "avance.$.descripcion": args.descripcion} }
            );
            
          return "avance registrado correctamente"
        }
        else{
          return "no es estudiante"
        }

      },


    },
  };
  

export { resolversProyecto };