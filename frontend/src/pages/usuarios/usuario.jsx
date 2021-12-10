import React from 'react';
import {  Link } from 'react-router-dom';
import { useQuery} from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import ButtonLoading from 'components/ButtonLoading';

export default function PerfilUsuario (props) {
  const _id=props._id;
  const usuario=_id;
  console.log('/usuarios/editar/'+usuario)
  const {
    data: queryData,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: {_id, usuario },
  });

  if (queryLoading) return <div>Cargando....</div>;
console.log("query data: "+queryData)
  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/usuarios'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>{queryData.Usuario.nombre}</h1>
      
        <div>
        Datos personales
          <table className='tabla'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Identificación</th>
                <th>Rol de usuario</th>
                <th>Estado</th>
              </tr>
              </thead>
              <tbody>
              <td>{queryData.Usuario.nombre}</td>
              <td>{queryData.Usuario.email}</td>
              <td>{queryData.Usuario.idUsuario}</td>
              <td>{queryData.Usuario.rol}</td>
              <td>{queryData.Usuario.estado}</td>
              </tbody>
            </table>        
        </div>

        <ButtonLoading
          onClick={(e) => {
            e.preventDefault();
            window.location.href='/usuarios/editar/'+usuario
            }}
          text='editar'
          queryLoading={queryLoading}
          disabled={false}
        />              
    </div>
  );
};


