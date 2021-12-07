import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import { AVANCES } from 'graphql/proyectos/queries';


export default function Inscripciones (props) {
  const imprimir = [];
   const idUsuario = props._id;
  const { data, error, loading } = useQuery(AVANCES, {
    variables: { idUsuario }});
    useEffect(() => {
      if (error) {
        toast.error('Error consultando los proyectos');
      }
             
    }, [error]);
  if (loading) return <div>Cargando.... </div>;
  
 
  data.ListarAvances.forEach((u) => {
    console.log(u.avance.length)
    if(u.avance.length > 0){
      
    u.avance.forEach((x)=> {
    
    imprimir.push({
      "_id":x._id,
    "nombre":u.nombre, 
    "fecha":x.fecha, 
    "descripcion":x.descripcion,
    "observacionesDelLider":x.observacionesDelLider,
  
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
              
              <th>Fecha de Ingreso </th>
              <th>Fecha de Egreso </th>
              
            </tr>
          </thead>
          <tbody>
            {data && data.ListarAvances ? (
              <>
                {imprimir.map((x) => {
                  return( <tr key={x._id}>
                    <td>{x.nombre}</td>
                    <td>{x.fecha}</td>
                   
                    <td>{x.descripcion}</td>
                    <td>{x.observacionesDelLider}
                    
                      <Link to={`/proyectos/avances/observacion/${x._id}`}>
                        <i className='fas fa-plus-circle text-green-600 hover:text-green-400 cursor-pointer' />
                      </Link>
                      </td>
                    
                    
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


