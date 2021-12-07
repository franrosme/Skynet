import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery} from '@apollo/client';
import { GET_PROYECTO} from 'graphql/proyectos/queries';
import { Button } from "react-bootstrap";
import PrivateRoute from 'components/PrivateRoute';

import { toast } from 'react-toastify';
import PrivateComponent from 'components/PrivateComponent';

export default function Proyecto (props) {
  const idUsuario = props._id;
  console.log("id Usuario"+idUsuario)
  var { _id } = useParams();
  const idProyecto = _id;
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO, {
    variables: {idUsuario, idProyecto },
  });
  
  useEffect(() => {
    if (queryError) {
      toast.error('Error consultando los proyectos');
    }
  }, [queryError]);

  if (queryLoading) return <div>Cargando....</div>;
  return (
    <><PrivateComponent roleList={['Administrador']}>
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/proyectos'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <Button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='/proyecto/inscripcion/'+queryData.VerProyecto._id;
      }}
>Inscribirse</Button>
      
      <h1> {queryData.VerProyecto.nombre}</h1>
      <h2>Datos básicos </h2>
      <h1> {queryData.VerProyecto.nombre}</h1>
      <h3>Presupuesto:</h3> <p>{queryData.VerProyecto.presupuesto} </p>
      <h3>fase: </h3><p>{queryData.VerProyecto.fase} </p>
      <h3>estado: </h3><p>{queryData.VerProyecto.estado} </p>
      <h2>Informacion Lider</h2>
      <h3>Nombre:</h3> <p>{queryData.VerProyecto.lider.nombre}</p>
      <h3>Identificacion: </h3><p>{queryData.VerProyecto.lider.idUsuario}</p>
      <h3>Email: </h3><p>{queryData.VerProyecto.lider.email}</p>
      
      <h3>Avances: </h3><p>{queryData && queryData.VerProyecto.avance ? (
              <>
                {queryData.VerProyecto.avance.map((x) => {
                  return( <div key={x._id}>
                    
                    <h2>fecha</h2> {x.fecha}
                    
                   <h2>descripcion </h2> {x.descripcion}
                   
                   <Link to={`/proyectos/EditarAvance/${x._id}`}>
                        <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                      </Link>
                   <h2>observaciones </h2> {x.observacionesDelLider}
                                  
                    
                  </div>);
                   
                   
                   
                 
                })}
              </>
            ) : (
              <div>No hay avances</div>
            )}
       <Button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='/proyectos/AgregarAvance/'+queryData.VerProyecto._id;
      }}
>Agregar Avance</Button>
    </p>
     
    </div>
    </PrivateComponent>
    <PrivateComponent roleList={['Estudiante']}>
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/proyectos'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <Button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='/proyecto/inscripcion/'+queryData.VerProyecto._id;
      }}
>Inscribirse</Button>
      
      <h1> {queryData.VerProyecto.nombre}</h1>
      <h2>Datos básicos </h2>
      <h1> {queryData.VerProyecto.nombre}</h1>
      <h3>Presupuesto:</h3> <p>{queryData.VerProyecto.presupuesto} </p>
      <h3>fase: </h3><p>{queryData.VerProyecto.fase} </p>
      <h3>estado: </h3><p>{queryData.VerProyecto.estado} </p>
      <h2>Informacion Lider</h2>
      <h3>Nombre:</h3> <p>{queryData.VerProyecto.lider.nombre}</p>
      <h3>Identificacion: </h3><p>{queryData.VerProyecto.lider.idUsuario}</p>
      <h3>Email: </h3><p>{queryData.VerProyecto.lider.email}</p>
      
      <h3>Avances: </h3><p>{queryData && queryData.VerProyecto.avance ? (
              <>
                {queryData.VerProyecto.avance.map((x) => {
                  return( <div key={x._id}>
                    
                    <h2>fecha</h2> {x.fecha}
                    
                   <h2>descripcion </h2> {x.descripcion}
                   
                   <Link to={`/proyectos/EditarAvance/${x._id}`}>
                        <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                      </Link>
                   <h2>observaciones </h2> {x.observacionesDelLider}
                                  
                    
                  </div>);
                   
                   
                   
                 
                })}
              </>
            ) : (
              <div>No hay avances</div>
            )}
       <Button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='/proyectos/AgregarAvance/'+queryData.VerProyecto._id;
      }}
>Agregar Avance</Button>
    </p>
     
    </div>
    </PrivateComponent>
    <PrivateComponent roleList={['Lider']}>
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/proyectos'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <Button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='/proyecto/inscripcion/'+queryData.VerProyecto._id;
      }}
>Inscribirse</Button>
      
      <h1> {queryData.VerProyecto.nombre}</h1>
      <h2>Datos básicos </h2>
      <h1> {queryData.VerProyecto.nombre}</h1>
      <h3>Presupuesto:</h3> <p>{queryData.VerProyecto.presupuesto} </p>
      <h3>fase: </h3><p>{queryData.VerProyecto.fase} </p>
      <h3>estado: </h3><p>{queryData.VerProyecto.estado} </p>
      <h2>Informacion Lider</h2>
      <h3>Nombre:</h3> <p>{queryData.VerProyecto.lider.nombre}</p>
      <h3>Identificacion: </h3><p>{queryData.VerProyecto.lider.idUsuario}</p>
      <h3>Email: </h3><p>{queryData.VerProyecto.lider.email}</p>
      
      <h3>Avances: </h3><p>{queryData && queryData.VerProyecto.avance ? (
              <>
                {queryData.VerProyecto.avance.map((x) => {
                  return( <div key={x._id}>
                    
                    <h2>fecha</h2> {x.fecha}
                    
                   <h2>descripcion </h2> {x.descripcion}
                   
                   <Link to={`/proyectos/EditarAvance/${x._id}`}>
                        <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                      </Link>
                   <h2>observaciones </h2> {x.observacionesDelLider}
                                  
                    
                  </div>);
                   
                   
                   
                 
                })}
              </>
            ) : (
              <div>No hay avances</div>
            )}
       <Button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='/proyectos/AgregarAvance/'+queryData.VerProyecto._id;
      }}
>Agregar Avance</Button>
    </p>
     
    </div>
    </PrivateComponent>
  </>
  );
};
