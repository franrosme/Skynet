import React from 'react';
import {  Link } from 'react-router-dom';
import { useQuery} from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import { Button } from "react-bootstrap";

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
      <h2>Datos personales </h2>
      <h3>Email:</h3> <p>{queryData.Usuario.email} </p>
      <h3>Identificación: </h3><p>{queryData.Usuario.idUsuario} </p>
      <h2>Informacion </h2>
      <h3>Rol del usuario:</h3> <p>{queryData.Usuario.rol}</p>
      <h3>Estado del usuario: </h3><p>{queryData.Usuario.estado}</p>
      <Button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='/usuarios/editar/'+usuario;
      }}
>Editar</Button>
    </div>
  );
};


