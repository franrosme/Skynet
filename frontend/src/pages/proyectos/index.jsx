import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROYECTOS } from 'graphql/proyectos/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_FaseProyecto, Enum_EstadoProyecto } from 'utils/enums';
import PrivateComponent from 'components/PrivateComponent';


export default function IndexProyectos (props) {
  
   const idUsuario = props._id;
   const nombre = props.nombre;
  const { data, error, loading } = useQuery(GET_PROYECTOS, {
    variables: { idUsuario }});
    useEffect(() => {
      if (error) {
        toast.error('Error consultando los proyectos');
      }
    }, [error]);
  if (loading) return ( 
    <div
    className="
      animate-spin
      rounded-full
      h-10
      w-10
      border-t-2 border-b-2 border-blue-500
    "
  ></div>
);
  return (<>
  <PrivateComponent roleList={['Administrador']}>
 
      
      <div className="container">  
      <h1 className="titulo"> Proyectos</h1>
     </div> 

 

 
      <div>
        <table className = "table table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Lider</th>
              <th>Fase</th>
              <th>Estado</th>
              <th>Acciones</th>
              
            </tr>
          </thead>
          <tbody>
            {data && data.ListarProyectos ? (

              <>
                {data.ListarProyectos.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td><div><div className = "title-th" data-title = "Nombre: "></div>{u.nombre}</div></td>
                      <td><div><div  className = "title-th" data-title = "Lider: "></div>{u.lider.nombre}</div></td>
                      <td><div><div className = "title-th" data-title = "Fase: "></div>{Enum_FaseProyecto[u.fase]}</div></td>
                      
                      
                        <td><div><div  className = "title-th" data-title = "Estado: "></div>{Enum_EstadoProyecto[u.estado]}
                     
                     {(u.estado==="Inactivo" && u.fase===null) ?
                     (<Link to={`/proyectos/aprobar/${u._id}`} alt='Aprobar proyecto'>
                          <i className='fas fa-thumbs-up text-green-600 hover:text-green-400 cursor-pointer' />
                        </Link>):(<div></div>)}
                        {(u.estado==="Activo" && (u.fase==="Iniciado" ||u.fase==="En_Desarrollo" )) ?
                        (<Link to={`/proyectos/inactivar/${u._id}`} alt='Inactivar proyecto'>
                          <i className='fas fa-power-off text-red-600 hover:text-red-400 cursor-pointer' />
                        </Link>):(<div></div>)}
                        {(u.estado==="Activo" && u.fase==="En_Desarrollo") ?
                        (<Link to={`/proyectos/terminar/${u._id}`} alt='Terminar proyecto'>
                          <i className='fas fa-window-close text-red-600 hover:text-red-400 cursor-pointer' />
                        </Link>):(<div></div>)}
                        {(u.estado==="Inactivo" && u.fase!=="Terminado" && u.fase!==null) ?
                        (<Link to={`/proyectos/reabrir/${u._id}`} alt='Reabrir proyecto'>
                          <i className='fas fa-power-off text-green-600 hover:text-green-400 cursor-pointer' />
                        </Link>):(<div></div>)}
                     </div></td>
                     <td><div><div  className = "title-th" data-title = "Acciones: "></div>
                      <Link to={`/proyectos/editar/${u._id}`}>
                          <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                        </Link>
                        <Link to={`/proyecto/${u._id}`}>
                          <i className='fas fa-eye text-blue-600 hover:text-blue-400 cursor-pointer' />
                        </Link></div></td>
                     
                    </tr>
                  );
                })}
              </>
            ) : (
              <div>No autorizado</div>
            )}
          </tbody>
        </table>
     </div>
    </PrivateComponent>
    <PrivateComponent roleList={['Lider']}>
 
      
      <div className="container">  
      <h1 className="titulo"> Proyectos Liderados Por: {nombre}</h1>
     </div> 
     {data && data.ListarProyectos ? (
  <div className="btn buttonAdd" onClick={(e) => {
            e.preventDefault();
            
            window.location.href = '/proyectos/crear/' + idUsuario;
          } }> <i className='fas fa-plus-circle text-white-600 cursor-pointer' /> Crear Proyecto
  </div>):(<div></div>)}

 
      <div>
        <table className = "table table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Presupuesto</th>
              <th>Fase</th>
              <th>Estado</th>
              <th>Acciones</th>
              
            </tr>
          </thead>
          <tbody>
            {data && data.ListarProyectos ? (

              <>
                {data.ListarProyectos.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td><div><div className = "title-th" data-title = "Nombre: "></div>{u.nombre}</div></td>
                      <td><div><div className = "title-th" data-title = "Presupuesto: "></div>{u.presupuesto}</div></td>
                      <td><div><div className = "title-th" data-title = "Fase: "></div>{Enum_FaseProyecto[u.fase]}</div></td>
                      <td><div><div  className = "title-th" data-title = "Estado: "></div>{Enum_EstadoProyecto[u.estado]}</div></td>
                      <td><div><div  className = "title-th" data-title = "Acciones: "></div>
                    {u.estado==="Activo" ? (
                         <Link to={`/proyectos/editar/${u._id}`}>
                         <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                       </Link>
                    ):( <div></div>)

                    }
                    
                   
                        <Link to={`/proyecto/${u._id}`}>
                          <i className='fas fa-eye text-blue-600 hover:text-blue-400 cursor-pointer' />
                        </Link></div></td>
                                        
                    </tr>
                  );
                })}
              </>
            ) : (
              <div>No autorizado</div>
            )}
          </tbody>
        </table>
     </div>
    </PrivateComponent>
    <PrivateComponent roleList={['Estudiante']}>
 
      
      <div className="container">  
      <h1 className="titulo"> Proyectos</h1>
     </div> 


      <div>
        <table className = "table table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Lider</th>
              <th>Fase</th>
              <th>Estado</th>
              <th>Acciones</th>
           </tr>
          </thead>
          <tbody>
            {data && data.ListarProyectos ? (

              <>
                {data.ListarProyectos.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td><div><div className = "title-th" data-title = "Nombre: "></div>{u.nombre}</div></td>
                      <td><div><div  className = "title-th" data-title = "Lider: "></div>{u.lider.nombre}</div></td>
                      <td><div><div className = "title-th" data-title = "Fase: "></div>{Enum_FaseProyecto[u.fase]}</div></td>
                      <td><div><div  className = "title-th" data-title = "Estado: "></div>{Enum_EstadoProyecto[u.estado]}</div></td>
                      <td><div><div  className = "title-th" data-title = "Acciones: "></div>
                      <Link to={`/proyecto/${u._id}`}>
                          <i className='fas fa-eye text-blue-600 hover:text-blue-400 cursor-pointer' />
                    </Link></div></td>
                                         
                    </tr>
                  );
                })}
              </>
            ) : (
              <div>No autorizado</div>
            )}
          </tbody>
        </table>
     </div>
    </PrivateComponent></>);
};


