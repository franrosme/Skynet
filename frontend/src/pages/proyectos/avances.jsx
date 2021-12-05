import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROYECTOS } from 'graphql/proyectos/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_FaseProyecto, Enum_EstadoProyecto } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';
import { Button } from "react-bootstrap";


export default function Avances (props) {
  
   const idUsuario = props._id;
  console.log(idUsuario)
  const { data, error, loading } = useQuery(GET_PROYECTOS, {
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
      <Button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='/proyectos/crear/'+idUsuario;
      }}
>Crear Avance</Button>
       <h1> Avances:</h1>
        <table className='tabla'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Lider</th>
              <th>Identificación</th>
              <th>fase</th>
              <th>Estado</th>
              <th>Acciones</th>
              <th>Cambiar estado</th>
            </tr>
          </thead>
          <tbody>
            {data && data.ListarProyectos ? (
              
              <>
                {data.ListarProyectos.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td>{u.nombre}</td>
                      <td>{u.lider.nombre}</td>
                      <td>{u.lider.idUsuario}</td>
                      <td>{Enum_FaseProyecto[u.fase]}</td>
                      <td>{Enum_EstadoProyecto[u.estado]}</td>
                      <td>
                        <Link to={`/proyectos/editar/${u._id}`}>
                          <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                        </Link>
                        <Link to={`/proyecto/${u._id}`}>
                          <i className='fas fa-eye text-blue-600 hover:text-blue-400 cursor-pointer' />
                        </Link>
                      </td>
                      <td>
                        <Link to={`/proyectos/aprobar/${u._id}`} alt='Aprobar proyecto'>
                          <i className='fas fa-thumbs-up text-green-600 hover:text-green-400 cursor-pointer' />
                        </Link>
                        <Link to={`/proyecto/inactivar/${u._id}`} alt='Inactivar proyecto'>
                          <i className='fas fa-power-off text-red-600 hover:text-red-400 cursor-pointer' />
                        </Link>
                        <Link to={`/proyecto/terminar/${u._id}`} alt='Terminar proyecto'>
                          <i className='fas fa-window-close text-red-600 hover:text-red-400 cursor-pointer' />
                        </Link>
                        <Link to={`/proyecto/reabrir/${u._id}`} alt='Reabrir proyecto'>
                          <i className='fas fa-power-off text-green-600 hover:text-green-400 cursor-pointer' />
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
      </div>
    </PrivateRoute>
  );
};


