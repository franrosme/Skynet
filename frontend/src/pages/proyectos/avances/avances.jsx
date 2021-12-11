import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import PrivateComponent from 'components/PrivateComponent';
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
    <PrivateRoute roleList={['Administrador','Lider']}>
    <PrivateComponent roleList={['Administrador','Lider']}>
    <div className="container">  
      <h1 className="titulo">Avances</h1>
      <div>
        <table className = "table table-bordered">
          <thead>
            <tr>
             <th>Nombre del proyecto</th>
              <th>Fecha del avance</th>
              <th>Descripción</th>
              <th>Observaciones del Lider</th>
           </tr>
          </thead>
          <tbody>
          {data && data.ListarAvances ? (
           <>
             {imprimir.map((x) => {
                  return (
                    <tr key={x._id}>
                      <td><div><div className = "title-th" data-title = "Nombre del proyecto: "></div>{x.nombre}</div></td>
                      <td><div><div  className = "title-th" data-title = "fecha del avance: "></div>{x.fecha}</div></td>
                      <td><div><div className = "title-th" data-title = "Descripción: "></div>{x.descripcion}</div></td>
                      <td><div><div className = "title-th" data-title = "Observaciones del Lider: "></div>
                      {x && x.observacionesDelLider.length>0 ? (
                        <>
                        {x.observacionesDelLider.map((i) => {
                          return( <div key={i._id}>
                            <li>{i}</li>
                            <Link to={`/proyectos/avances/observacion/${x._id}`}>
                     <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                   </Link>        
                          </div> );})}
                          <Link to={`/proyectos/avances/nuevaObservacion/${x._id}`}>
                     <i className='fas fa-plus-circle text-green-600 hover:text-green-400 cursor-pointer' />
                   </Link></>
                      ) : (
                        <div>No hay Observaciones
                          <Link to={`/proyectos/avances/nuevaObservacion/${x._id}`}>
                     <i className='fas fa-plus-circle text-green-600 hover:text-green-400 cursor-pointer' />
                   </Link>
                        </div>
                      )}
                      
                      
                      
                   
                      </div></td>
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
   </div> 
    </PrivateComponent>
   
    </PrivateRoute>
  );
};


