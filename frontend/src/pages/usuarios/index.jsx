import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';
import PrivateComponent from 'components/PrivateComponent';


export default function IndexUsuarios (props) {
  
   const _id = props._id;
   console.log("usuario :"+_id)
  
  const { data, error, loading } = useQuery(GET_USUARIOS, {
    variables: { _id }});
    useEffect(() => {
      if (error) {
        toast.error('Error consultando los usuarios');
      }
    }, [error]);
  if (loading) return <div>Cargando.... </div>;

  return (
    <><PrivateComponent roleList={['Administrador']}>
      
      <div>
        Datos Usuarios:
        <table className='tabla'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Identificación</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {data && data.Usuarios ? (

              <>
                {data.Usuarios.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td>{u.nombre}</td>
                      <td>{u.email}</td>
                      <td>{u.idUsuario}</td>
                      <td>{Enum_Rol[u.rol]}</td>
                      <td>{Enum_EstadoUsuario[u.estado]}
                      <Link to={`/usuarios/cambiarEstado/${u._id}`}>
                          <i className='userpen fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer text-align: right' />
                        </Link></td>
                      <td>
                        <Link to={`/usuarios/editar/${u._id}`}>
                           <i className='userpen fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer display: inline' />
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
    </PrivateComponent>
    <PrivateComponent roleList={['Lider']}>
        <div>
          Datos Usuarios:
          <table className='tabla'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Identificación</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {data && data.Usuarios ? (

                <>
                  {data.Usuarios.map((u) => {
                    return (
                      <tr key={u._id}>
                        <td>{u.nombre}</td>
                        <td>{u.email}</td>
                        <td>{u.idUsuario}</td>
                        <td>{Enum_Rol[u.rol]}</td>
                        <td>{Enum_EstadoUsuario[u.estado]}</td>
                        <td>
                          <Link to={`/usuarios/editar/${u._id}`}>
                            <i className='userpen fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
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
      </PrivateComponent></>
  );
};


