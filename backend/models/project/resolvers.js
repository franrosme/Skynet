import { ProjectModel } from './projectModel.js';
import { UserModel } from '../user/userModel.js';

const resolversProyecto = {
    Query: {
      ListarProyectos: async (parent, args) => {
        const user = await UserModel.findOne({ _id: args.idUsuario })
        if (user && user.estado === "Autorizado" && (user.rol==="Administrador"||user.rol==="Estudiante")) {
          const proyectos = await ProjectModel.find({},{}).populate("lider").populate('inscripcion.estudiante');;
          return proyectos;
        }
        else if(user && user.estado === "Autorizado" && user.rol==="Lider"){
          const proyectos = await ProjectModel.find({lider:user._id},{}).populate("lider").populate('inscripcion.estudiante');;
          return proyectos;
        } else {
            return console.log("Rol no valido o usuario no autorizado")}
        },
        ListarInscripciones: async (parent, args) => {
          const user = await UserModel.findOne({ _id: args.idUsuario })
          if(user && user.estado === "Autorizado" && user.rol==="Lider"){
            const inscripcion = await ProjectModel.find({lider:user._id},{"inscripcion":1,"nombre":1}).populate('inscripcion.estudiante');;
            return inscripcion;
          }
          else if(user && user.estado === "Autorizado" && user.rol==="Administrador"){
            const inscripcion = await ProjectModel.find({},{"inscripcion":1,"nombre":1}).populate('inscripcion.estudiante');;
            return inscripcion;
          } else{
            return console.log("Rol no valido o usuario no autorizado") }      
        },
        getInscripcion: async (parent, args) => {
          const user = await UserModel.findOne({ _id: args.idUsuario })
          if(user && user.estado === "Autorizado" && user.rol==="Lider"){
            const inscripcion = await ProjectModel.find({
              $and:[
                {"inscripcion._id":{$eq:args.idInscripcion}},           
                {lider:{$eq:user._id}},
              ]},{"inscripcion":1,"nombre":1}).populate('inscripcion.estudiante');;
            return inscripcion;
          }
          else if(user && user.estado === "Autorizado" && user.rol==="Administrador"){
            const inscripcion = await ProjectModel.find({inscripcion:{$elemMatch:{_id:{$eq: args.idInscripcion}}}},{"nombre":1,"inscripcion.$":1}).populate('inscripcion.estudiante');;
            return inscripcion;
          } else{
            return console.log("Rol no valido o usuario no autorizado") }      
        },
        VerProyecto: async (parent, args) => {
          const user = await UserModel.findOne({ _id: args.idUsuario })
          if(user && user.estado === "Autorizado" && user.rol==="Administrador"){
            const proyecto = await ProjectModel.findOne({_id:args.idProyecto}).populate("lider").populate('inscripcion.estudiante');
            return proyecto;
          } 
          else if(user && user.estado === "Autorizado" && user.rol==="Lider"){
            const proyecto = await ProjectModel.findOne({
              $and:[
                {_id:{$eq:args.idProyecto}},           
                {lider:{$eq:user._id}},
              ]}).populate("lider").populate('inscripcion.estudiante');
            return proyecto;
            } 
          else if(user && user.estado === "Autorizado" && user.rol==="Estudiante"){
              const proyecto = await ProjectModel.findOne({_id:args.idProyecto}).populate("lider").populate('inscripcion.estudiante');
              return proyecto;
          } else{
            return console.log("Rol no valido o usuario no autorizado") }
        },
        ListarAvances: async (parent, args) => {
          const user = await UserModel.findOne({ _id: args.idUsuario })
          if(user && user.estado === "Autorizado" && user.rol==="Lider"){
            const avances = await ProjectModel.find({lider:user._id},{"avance":1,"nombre":1});
            return avances;
          }
          else if(user && user.estado === "Autorizado" && user.rol==="Administrador"){
            const avances = await ProjectModel.find({},{"avance":1,"nombre":1});
            return avances;
          } else{
            return console.log("Rol no valido o usuario no autorizado") }      
        },
        VerAvance: async (parent, args) => {
          const user = await UserModel.findOne({ _id: args.idUsuario })
          if(user && user.estado === "Autorizado" && user.rol==="Lider"){
            const avance = await ProjectModel.find({
              $and:[
                {"avance._id":{$eq:args.idAvance}},           
                {lider:{$eq:user._id}},
              ]},{"inscripcion":1,"nombre":1});
            return avance;
          }
          else if(user && user.estado === "Autorizado" && (user.rol==="Administrador"||user.rol==="Estudiante")){
            const avance = await ProjectModel.find({avance:{$elemMatch:{_id:{$eq: args.idAvance}}}},{"nombre":1,"avance.$":1});
            return avance;
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
        const user = await UserModel.findOne({ _id: args.idUsuario })
        if(user && user.estado === "Autorizado" && (user.rol==="Lider"||user.rol==="Administrador")){
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
        const user = await UserModel.findOne({ _id: args.idUsuario })
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
        const user = await UserModel.findOne({ _id: args.idUsuario })
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
        const user = await UserModel.findOne({ _id: args.idUsuario })
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
        const user = await UserModel.findOne({ _id: args.idUsuario })
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
      terminarProyecto: async (parent, args) => {
        const user = await UserModel.findOne({ _id: args.idUsuario })
        if(user && user.estado === "Autorizado" && user.rol==="Administrador"){
          const finalizado = await ProjectModel.updateOne({
            $and:[
              {_id:{$eq:args.idProyecto}},
              {estado:{$eq:"Activo"}},
              {fase:{$eq:"En_Desarrollo"}},
            ]},
            { $set: { "fase" : "Terminado",
                      "estado" :"Inactivo",
                      "fechaFin": new Date()} }
            );
            if(finalizado.modifiedCount>0){
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
                return busqueda.nombre +  "Proyecto terminado"
            }
            else{ return "No se pudo cambiar la fase del proyecto"};
        }
        else{
          return "no es administrador"
        }
  
      },
      
      cambiarEstadoInscripcion: async (parent, args) => {
        const user = await UserModel.findOne({ _id: args.idUsuario })
          if(user && user.estado === "Autorizado" && (user.rol==="Administrador"||user.rol==="Lider")&&(args.estado==="Aceptada")){
          const estadoInscripcion = await ProjectModel.updateOne({
            $and:[
              {"inscripcion._id":{$eq: args.idInscripcion}},
              {estado:{$eq:"Activo"}},
              ]},
            { $set: { "inscripcion.$.estado": args.estado,
                      "inscripcion.$.fechaDeIngreso": new Date()} }
            );
            if(estadoInscripcion.modifiedCount>0){
              return " Nuevo estado: "+args.estado
            }
            else{ return "No se pudo cambiar el estado de la inscripcion"};
          
  
        }else if(user && user.estado === "Autorizado"&&(user.rol==="Administrador"||user.rol==="Lider")&&(args.estado==="Rechazada")){
          const estadoInscripcion = await ProjectModel.updateOne({
            $and:[
              {"inscripcion._id":{$eq: args.idInscripcion}},
              {estado:{$eq:"Activo"}},
        ]
            
            },
            { $set: { "inscripcion.$.estado": args.estado} }
            );
            if(estadoInscripcion.modifiedCount>0){
              return " Nuevo estado: "+args.estado
            }
            else{ return "No se pudo cambiar el estado de la inscripcion"};
        }
        else if(user && user.estado === "Autorizado"&& user.rol==="Administrador"&&(args.estado==="Pendiente")){
          const estadoInscripcion = await ProjectModel.updateOne({
            $and:[
              {"inscripcion._id":{$eq: args.idInscripcion}},
              {estado:{$eq:"Activo"}},
        ]
            
            },
            { $set: { "inscripcion.$.estado": args.estado} }
            );
            if(estadoInscripcion.modifiedCount>0){
              return " Nuevo estado: "+args.estado
            }
            else{ return "No se pudo cambiar el estado de la inscripcion"};
        }
        else{
          return "Rol no autorizado"
        }
  
      },
      agregarObservaciones: async (parent, args) => {
        const user = await UserModel.findOne({ _id: args.idUsuario })
        if(user && user.estado === "Autorizado" && user.rol==="Lider"){
          const observaciones = await ProjectModel.updateOne({
            $and:[
              {"avance._id":{$eq: args.idAvance}},
              {estado:{$eq:"Activo"}},
              {lider:{$eq:user._id}}]},
            { $set: { "avance.$.observacionesDelLider": args.observacionesDelLider} });
            if(observaciones.modifiedCount>0){
              return "Observaciones: "+args.observacionesDelLider
            }
            else{ return "No se pudo guardar la observacion"};
          }
        else if(user && user.estado === "Autorizado" && user.rol==="Administrador"){
          const observaciones = await ProjectModel.updateOne({
            $and:[
              {"avance._id":{$eq: args.idAvance}},
              {estado:{$eq:"Activo"}}]},
            { $set: { "avance.$.observacionesDelLider": args.observacionesDelLider} }
            );
            if(observaciones.modifiedCount>0){
              return "Observaciones: "+args.observacionesDelLider
            }
            else{ return "No se pudo guardar la observacion"};
          }else{
           return "Rol no valido"
        }
      },
      inscripcion:  async (parent, args) => {
        var reabrirInscripcion = false;
       const user = await UserModel.findOne({ _id: args.inscripcion.estudiante })
       if(user && user.estado === "Autorizado" && user.rol==="Estudiante"){
          const busqueda = await ProjectModel.findOne({
            _id:args.idProyecto, "inscripcion.idEstudiante":user._id });
              if(busqueda !== null){
                for(let i = 0; i < busqueda.inscripcion.length; i++) {
                  if(busqueda.inscripcion[i].estudiante=== user._id){
                    if(busqueda.inscripcion[i].estado==="Aceptada" && busqueda.inscripcion[i].fechaDeEgreso===null){
                      reabrirInscripcion = false;
                      return "El usuario ya pertenece al proyecto indicado"
                    }else if(busqueda.inscripcion[i].estado==="Rechazada")
                    {
                      reabrirInscripcion = false;
                      return "El usuario ya fue rechazado al proyecto indicado"
                    }
                    else if(busqueda.inscripcion[i].estado==="Aceptada" && busqueda.inscripcion[i].fechaDeEgreso!==null){
                      reabrirInscripcion = true;
                    }
                    else{
                      return "El usuario no pertenece al proyecto indicado"
                    }
                  }
                 }
                 if(reabrirInscripcion){
                  const inscripcion = await ProjectModel.updateOne({_id: args.idProyecto},                    
                    { $push: { inscripcion: args.inscripcion} });
                    if(inscripcion.modifiedCount>0){
                      return "El usuario ya trabajo en el proyecto indicado, puede inscribirse nuevamente al reabrir"
                    }
                    else{ return "No se pudo registrar"}
                 }
  
  
            }else{
                const inscripcion = await ProjectModel.updateOne({_id: args.idProyecto},                    
                  { $push: { inscripcion: args.inscripcion} });
                  if(inscripcion.modifiedCount>0){
                    return "Usuario inscrito por primera vez"
                  }
                  else{ return "No se pudo registrar"}
  
              }
           
        } else {
            return "Usuario no valido"
        }
       
      },
      registrarAvance:  async (parent, args) => {
        const user = await UserModel.findOne({ _id: args.idEstudiante })
        if(user && user.estado === "Autorizado" && user.rol==="Estudiante"){
          const NumeroAvances = await ProjectModel.find({
            _id:args.idProyecto, 
            avance:{$size:0}
          })
          if(NumeroAvances.length!==0){
          const primerAvance = await ProjectModel.updateOne({
            $and:[
            {_id:{$eq:args.idProyecto}},
            {estado:{$eq:"Activo"}},
            {fase:{$eq:"Iniciado"}},
            {"inscripcion.estado":{ $eq: "Aceptada"}},
            {"inscripcion.fechaDeEgreso":{ $eq: null}},
            {"inscripcion.idEstudiante":{ $eq: user.idUsuario}}]},
          {$push: { avance: args.avance}, $set: {fase:"En_Desarrollo"} }
          );
          if(primerAvance.modifiedCount>0){
            return "El primer avance fue registrado correctamente"
          }
          else{ return "El primer avance no se pudo registrar"}
           }else{
            const avance = await ProjectModel.updateOne({
            $and:[
              {_id:{$eq:args.idProyecto}},
              {estado:{$eq:"Activo"}},
              {fase:{$eq:"En_Desarrollo"}},
              {"inscripcion.estado":{ $eq: "Aceptada"}},
              {"inscripcion.fechaDeEgreso":{ $eq: null}},
              {"inscripcion.idEstudiante":{ $eq: user.idUsuario}}]},
            { $push: { avance: args.avance} }
            );
            if(avance.modifiedCount>0){
              return "El avance fue registrado correctamente"
            }
            else{ return "El avance no se pudo registrar"};
          }
        }else{
          return "no es estudiante"
        }
      },
      editarAvance:  async (parent, args) => {
        const user = await UserModel.findOne({ _id: args.idEstudiante })
        if(user && user.estado === "Autorizado" && (user.rol==="Estudiante")){
          const verificar = await ProjectModel.findOne({
            $and:[
              {estado:{$eq:"Activo"}},
              {fase:{$ne:"Iniciado"}},
              {"inscripcion.estado":{ $eq: "Aceptada"}},
              { "avance._id":{ $eq: args.idAvance }},
              {"inscripcion.estudiante":{ $eq: user._id}}]
          })
          if(verificar){
          const avance = await ProjectModel.updateOne({
             "avance._id": args.idAvance 
            },
            { $set: { "avance.$.descripcion": args.descripcion} }
            );
            if(avance.modifiedCount>0){
  
              return "El avance se actualizo correctamente"
            }
            else{ return "El avance no se pudo actualizar"}}
            else{ return "No tiene permisos para editar los avances"}
          }else{
            return "no es estudiante"
        }
      },
    },
  };
  

export { resolversProyecto };