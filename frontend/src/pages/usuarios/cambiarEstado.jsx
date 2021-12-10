import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { CAMBIAR_ESTADO_USUARIO } from 'graphql/usuarios/mutations';
import DropDown from 'components/Dropdown';

import {Enum_EstadoUsuario } from 'utils/enums';

export default function CambiarEstadoUsuario (props) {
  
  
  const { form, formData, updateFormData } = useFormData(null);
  var { _id } = useParams();
  var usuario= _id;
  _id=props._id;
  console.log("id usuario: "+ _id)
  console.log("id a cambiar: "+ usuario)
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: {_id, usuario },
  });


  const [cambiarEstado, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(CAMBIAR_ESTADO_USUARIO);

  const submitForm = (e) => {
    e.preventDefault();
    delete formData.rol;
    const estado =formData.estado;
    cambiarEstado({
      variables: { _id, usuario, estado },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Usuario modificado correctamente');
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el usuario');
    }

    if (queryError) {
      toast.error('Error consultando el usuario');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;
console.log("query data: "+queryData)
  return (
    <body className= 'bg-gray-500 w-full h-full'>
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/usuarios/'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Cambiar Estado</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >
        Nombre de la persona:{queryData.Usuario.nombre}
        
     
        Email de la persona:{queryData.Usuario.email}
       
        Identificación de la persona:{queryData.Usuario.idUsuario}
      
          <DropDown
          label='Estado:'
          name='estado'
          defaultValue={Enum_EstadoUsuario[queryData.Usuario.estado]}
          required={true}
          options={Enum_EstadoUsuario}
        />
        <span>Rol del usuario: {queryData.Usuario.rol}</span>
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text='Confirmar'
        />
      </form>
    </div>
    </body>
  );
};

