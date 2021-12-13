import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_EstadoInscripcion } from 'utils/enums';
import PrivateComponent from 'components/PrivateComponent';
import { INSCRIPCIONES } from 'graphql/proyectos/queries';


export default function Inscripciones (props) {
  const nombre = props.nombre;
   const idUsuario = props._id;
  const { data, error, loading } = useQuery(INSCRIPCIONES, {
    variables: { idUsuario }});
    useEffect(() => {
      if (error) {
        toast.error('Error consultando los proyectos');
      }
    }, [error]);
  if (loading) return <div>Cargando.... </div>;
  
  const imprimir = []
  if(data.ListarInscripciones){
  data.ListarInscripciones.forEach((u) => {
    if(u.inscripcion.length > 0){
      
    u.inscripcion.forEach((x)=> {
    
    imprimir.push({
      "_id":x._id,
    "nombre":u.nombre, 
    "lider":u.lider,
    "nombreE":x.estudiante.nombre,
    "_idE":x.estudiante._id,
    "idEstudiante":x.estudiante.idUsuario, 
    "estado":x.estado,
    "fechaDeEgreso":x.fechaDeEgreso,
    "fechaDeIngreso":x.fechaDeIngreso,
  
  })
   
     })
    
   }
  })}
    
  return (
    <>
   <PrivateComponent roleList={['Administrador']}>
        <div className="container">  
      <h1 className="titulo"> Inscripciones A Proyectos</h1>
     </div> 


      <div>
        <table className = "table table-bordered">
          <thead>
            <tr>
              <th>Nombre del proyecto</th>
              <th>Nombre del estudiante</th>
              <th>Identificación del estudiante</th>
              <th>Estado</th>
              <th>Fecha de Ingreso </th>
              <th>Fecha de Egreso </th>
              
            </tr>
          </thead>
          <tbody>
          {data && data.ListarInscripciones ? (
              <>
                {imprimir.map((x) => {
                 
                  return( <tr key={x._id}>
                    <td><div><div className = "title-th" data-title = "Nombre del proyecto: "></div>{x.nombre}</div></td>
                    <td><div><div className = "title-th" data-title = "Nombre del estudiante: "></div>{x.nombreE}</div></td>
                    <td><div><div className = "title-th" data-title = "Identificación del estudiante: "></div>{x.idEstudiante}</div></td>
                    <td><div><div className = "title-th" data-title = "Estado: "></div>{Enum_EstadoInscripcion[x.estado]}
                    <Link to={`/proyectos/inscripciones/estado/${x._id}`}>
                        <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                      </Link>
                    </div></td>
                    <td><div><div className = "title-th" data-title = "Fecha de Ingreso: "></div>{x.fechaDeIngreso}</div></td>
                    <td><div><div className = "title-th" data-title = "Fecha de Egreso: "></div>{x.fechaDeEgreso}</div></td>
                    </tr>);
               
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
      <h1 className="titulo"> Mis Inscripciones A Proyectos</h1>
     </div> 


      <div>
        <table className = "table table-bordered">
          <thead>
            <tr>
              <th>Nombre del proyecto</th>
              <th>Nombre del estudiante</th>
              <th>Identificación del estudiante</th>
              <th>Estado</th>
              <th>Fecha de Ingreso </th>
              <th>Fecha de Egreso </th>
              
            </tr>
          </thead>
          <tbody>
          {data && data.ListarInscripciones ? (
              <>
                {imprimir.map((x) => {
                   if(x._idE===idUsuario){
                  return( <tr key={x._id}>
                    <td><div><div className = "title-th" data-title = "Nombre del proyecto: "></div>{x.nombre}</div></td>
                    <td><div><div className = "title-th" data-title = "Nombre del estudiante: "></div>{x.nombreE}</div></td>
                    <td><div><div className = "title-th" data-title = "Identificación del estudiante: "></div>{x.idEstudiante}</div></td>
                    <td><div><div className = "title-th" data-title = "Estado: "></div>{Enum_EstadoInscripcion[x.estado]}
                    </div></td>
                    <td><div><div className = "title-th" data-title = "Fecha de Ingreso: "></div>{x.fechaDeIngreso}</div></td>
                    <td><div><div className = "title-th" data-title = "Fecha de Egreso: "></div>{x.fechaDeEgreso}</div></td>
                    </tr>);}
                    else{return(<div>No tiene inscripciones</div>)}
               
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
      <h1 className="titulo"> Inscripciones A Proyectos Liderados Por: {nombre}</h1>
     </div> 


      <div>
        <table className = "table table-bordered">
          <thead>
            <tr>
              <th>Nombre del proyecto</th>
              <th>Nombre del estudiante</th>
              <th>Identificación del estudiante</th>
              <th>Estado</th>
              <th>Fecha de Ingreso </th>
              <th>Fecha de Egreso </th>
              
            </tr>
          </thead>
          <tbody>
          {data && data.ListarInscripciones ? (
              <>
                {imprimir.map((x) => {
                  if(x.lider===idUsuario){
                   
                  return( <tr key={x._id}>
                    <td><div><div className = "title-th" data-title = "Nombre del proyecto: "></div>{x.nombre}</div></td>
                    <td><div><div className = "title-th" data-title = "Nombre del estudiante: "></div>{x.nombreE}</div></td>
                    <td><div><div className = "title-th" data-title = "Identificación del estudiante: "></div>{x.idEstudiante}</div></td>
                    <td><div><div className = "title-th" data-title = "Estado: "></div>{Enum_EstadoInscripcion[x.estado]}
                    <Link to={`/proyectos/inscripciones/estado/${x._id}`}>
                        <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                      </Link>
                    </div></td>
                    <td><div><div className = "title-th" data-title = "Fecha de Ingreso: "></div>{x.fechaDeIngreso}</div></td>
                    <td><div><div className = "title-th" data-title = "Fecha de Egreso: "></div>{x.fechaDeEgreso}</div></td>
                    </tr>);}else{return (<div>No autorizado</div>)}
               
                })}
              </>
            ) : (
              <div>No autorizado</div>
            )}
            
          </tbody>
        </table>
     </div>
    </PrivateComponent></>
  );
};


