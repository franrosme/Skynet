import { ProjectModel } from './projectModel.js';

const resolversProyecto = {
    Query: {
      Proyectos: async (parent, args) => {
        const proyectos = await ProjectModel.find();
        return proyectos;
      },
      ListarProyectos: async (parent, args) => {
        if(args.rol==="Administrador"||args.rol==="Estudiante"){
          const proyectos = await ProjectModel.find({},{"nombre":1, "_id":0});
          return proyectos;

        }
        else if(args.rol==="Lider"){
          const proyectos = await ProjectModel.find({idLider:args.idLider},{"nombre":1, "_id":0});
          return proyectos;
        }
        else {
          return console.log("Rol no valido")
        }
        
      },
      ListarInscripciones: async (parent, args) => {
        if(args.rol==="Lider"){
          const inscripcion = await ProjectModel.find({idLider:args.idLider},{"inscripcion":1,"nombre":1});
          return inscripcion;
        }
        else{
          return console.log("no es Lider")
        }
        
      },
      VerProyecto: async (parent, args) => {
        if(args.rol==="Lider"){
        const proyecto = await ProjectModel.findOne({nombre:args.nombre, idLider:args.idLider});
        return proyecto;
        } else{
          return console.log("no es Lider")
        }
      },
     VerAvances: async (parent, args) => {
        if(args.rol==="Estudiante"){
        const avance = await ProjectModel.find({
          "inscripcion.idEstudiante":args.idEstudiante, 
          "inscripcion.estado":"Aceptada",
          nombre:args.nombre});
          return avance;
        } else{
          return console.log("no es Estudiante")
        }
      },
    },
    Mutation: {
      crearProyecto: async (parent, args) => {
        if(args.rol==="Lider"){
        const proyectoCreado = await ProjectModel.create({
          nombre: args.nombre,
          objetivosGenerales:args. objetivosGenerales,
          objetivosEspecificos: args.objetivosEspecificos,
          presupuesto: args.presupuesto,
          fechaInicio: args.fechaInicio,
          lider: args.lider,
          idLider: args.idLider,
          estado: args.estado,
          fase: args.fase,
      });
        return proyectoCreado;
      }
      },
      editarProyecto: async (parent, args) => {
        if(args.rol==="Lider"){
        const proyectoCreado = await ProjectModel.updateOne({
          idLider:args.idLider, 
          estado:"Activo",
          _id:args._id
        },
        {$set:{
          nombre: args.nombre,
          objetivosGenerales:args. objetivosGenerales,
          objetivosEspecificos: args.objetivosEspecificos,
          presupuesto: args.presupuesto
         }

      });
      if(proyectoCreado.modifiedCount>0){

        return "Proyecto actualizado"
      }
      else{ return "El proyecto no se pudo actualizar"}
       
      }
      },
      aprobarProyecto: async (parent, args) => {
        if(args.rol==="Administrador"){
          const proyectos = await ProjectModel.updateOne({nombre:args.nombre},
            { $set: { "fase" : "Iniciado"} }
            );
            console.log("proyecto aprobado");
          return "proyecto aprobado"

        }else{
          console.log("no es administrador")

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