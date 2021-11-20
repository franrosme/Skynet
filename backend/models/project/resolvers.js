import { ProjectModel } from './projectModel.js';

const resolversProyecto = {
    Query: {
      Proyectos: async (parent, args) => {
        const proyectos = await ProjectModel.find();
        return proyectos;
      },
      ListarProyectos: async (parent, args) => {
        if(args.rol==="Administrador"){
          const proyectos = await ProjectModel.find();
          return proyectos;

        }else{
          return console.log("no es administrador")
        }
        
      },
    },
    Mutation: {
      crearProyecto: async (parent, args) => {
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

      }
    },
  };
  

export { resolversProyecto };