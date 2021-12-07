import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_EstadoInscripcion } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';
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
  
  const imprimir = []
  data.ListarInscripciones.map((u) => {
    console.log(u.inscripcion.length)
    if(u.inscripcion.length > 0){
      
    u.inscripcion.forEach((x)=> {
    
    imprimir.push({
      "_id":x._id,
    "nombre":u.nombre, 
    "idEstudiante":x.estudiante.idUsuario, 
    "estado":x.estado,
    "fechaDeEgreso":x.fechaDeEgreso,
    "fechaDeIngreso":x.fechaDeIngreso,
  
  })
   
     })
    
   }
  })
    
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
            </tr>
          </thead>
          <tbody>
            {data && data.ListarInscripciones ? (
              <>
                {imprimir.map((x) => {
                  return( <tr key={x._id}>
                    <td>{x.nombre}</td>
                    <td>{x.idEstudiante}</td>
                    <td>{Enum_EstadoInscripcion[x.estado]}
                    <Link to={`/proyectos/inscripciones/estado/${x._id}`}>
                        <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                      </Link></td>
                    <td>{x.fechaDeIngreso}</td>
                    <td>{x.fechaDeEgreso}</td>
                    
                   
                    
                  </tr>);
                   
                   
                   
                 
                })}
              </>
            ) : (
              <div>No autorizado</div>
            )}
          
          </tbody>
        </table>
      </div>
      
    </PrivateRoute>
  );
};


