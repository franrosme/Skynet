import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_EstadoInscripcion, Enum_EstadoProyecto } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';
import { Button } from "react-bootstrap";
import { INSCRIPCIONES } from 'graphql/proyectos/queries';


export default function Inscripciones (props) {
  
   const idUsuario = props._id;
  console.log(idUsuario)
  const { data, error, loading } = useQuery(INSCRIPCIONES, {
    variables: { idUsuario }});
    useEffect(() => {
      if (error) {
        toast.error('Error consultando los proyectos');
      }
    }, [error]);
  if (loading) return <div>Cargando.... </div>;
  console.log(data.ListarProyectos)

    
  return (
    <PrivateRoute roleList={['Administrador']}>
        
      <div>
    
       <h1> Inscripciones:</h1>
       <table className='tabla'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Identificación Estudiante</th>
              <th>Estado</th>
              <th>Fecha de Ingreso </th>
              <th>Fecha de Egreso </th>
              <th>Cambiar estado</th>
            </tr>
          </thead>
          <tbody>
            {data && data.ListarInscripciones ? (
              <>
                {data.ListarInscripciones.map((u) => {
                  
                  console.log(u.inscripcion.length)
                  if(u.inscripcion.length > 0){
                    
                  u.inscripcion.forEach((x)=> {
                  console.log(x.idEstudiante)
                  return( <tr key={x._id}>
                    <td>l{u.nombre}</td>
                    <td>{x.idEstudiante}</td>
                    <td>{Enum_EstadoInscripcion[x.estado]}</td>
                    <td>{x.fechaDeEgreso}</td>
                    <td>{x.fechaDeIngreso}</td>
                    <td>
                      <Link to={`/proyectos/inscripciones/estado/${u.Inscripcion_id}`}>
                        <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                      </Link>
                     
                    </td>
                    
                  </tr>);
                   })
                   
                   
                 
                 }
                })}
              </>
            ) : (
              <div>No autorizado</div>
            )}
          
          </tbody>
        </table>
      </div>
      {/*} <div>
      
     {//data.ListarInscripciones.forEach((u) => {
                  data.ListarInscripciones.forEach((u) => {                 
                 // u.inscripcion.forEach((x)=> {
                  u.inscripcion.map((x)=> {
                  console.log(x.idEstudiante);
                  return (
                    <tr key={x._id}>
                    <td>l{u.nombre}</td>
                    <td>{x.idEstudiante}</td>
                    <td>{Enum_EstadoInscripcion[x.estado]}</td>
                    <td>{x.fechaDeEgreso}</td>
                    <td>{x.fechaDeIngreso}</td>
                    <td>
                      <Link to={`/proyectos/inscripciones/estado/${u.Inscripcion_id}`}>
                        <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                      </Link>
                     
                    </td>
                    
                  </tr>);
                   });
                   
                   
                 
                                 }
                                 
                                 )
                                 }

       <h1> Inscripciones:</h1>
        <table className='tabla'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Identificación Estudiante</th>
              <th>Estado</th>
              <th>Fecha de Ingreso </th>
              <th>Fecha de Egreso </th>
              <th>Cambiar estado</th>
            </tr>
          </thead>
          <tbody>
            {data && data.ListarInscripciones ? (
              
              <>
                {data.ListarInscripciones.map((u) => {
                  return (
                    <tr key={u.inscripcion._id}>
                      <td>{u.nombre}</td>
                      <td>{u.inscripcion.idEstudiante}</td>
                      <td>{Enum_EstadoInscripcion[u.inscripcion.estado]}</td>
                      <td>{u.inscripcion.fechaDeEgreso}</td>
                      <td>{u.nscripcion.fechaDeIngreso}</td>
                      <td>
                        <Link to={`/proyectos/inscripciones/estado/${u.Inscripcion_id}`}>
                          <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                        </Link>
                       
                      </td>
                      
                    </tr>
                  );
                })}
              </>
            ) : (
              <div>No autorizado</div>
            )}
          </tbody>
        </table>
      </div>{*/}
    </PrivateRoute>
  );
};


